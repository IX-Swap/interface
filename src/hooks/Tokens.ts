import { useMemo } from 'react'
import { parseBytes32String } from '@ethersproject/strings'
import { Currency, Token } from '@ixswap1/sdk-core'
import { TOKEN_SHORTHANDS } from 'constants/tokens'
import { arrayify } from 'ethers/lib/utils'
import keys from 'lodash.keys'
import omit from 'lodash.omit'

import { useSecTokens } from 'state/secTokens/hooks'
import { supportedChainId } from 'utils/supportedChainId'

import { createTokenFilterFunction } from '../components/SearchModal/filtering'
import { useAllLists, useCombinedActiveList, useInactiveListUrls } from '../state/lists/hooks'
import { WrappedTokenInfo } from '../state/lists/wrappedTokenInfo'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { useUserAddedTokens, useUserSecTokens } from '../state/user/hooks'
import { isEthChainAddress, isValidAddress } from '../utils'
import { TokenAddressMap, useUnsupportedTokenList } from './../state/lists/hooks'
import { useBytes32TokenContract, useTokenContract } from './useContract'
import { useNativeCurrency } from './useNativeCurrency'
import { useActiveWeb3React } from './web3'

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap: TokenAddressMap, includeUserAdded: boolean): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()

  return useMemo(() => {
    if (!chainId) return {}

    // reduce to just tokens
    let mapWithoutUrls = {}
    if (tokenMap[chainId]) {
      mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce<{ [address: string]: Token }>((newMap, address) => {
        newMap[address] = tokenMap[chainId]?.[address]?.token
        return newMap
      }, {})
    }

    if (includeUserAdded) {
      return (
        userAddedTokens
          // reduce into all ALL_TOKENS filtered by the current chain
          .reduce<{ [address: string]: Token }>(
            (tokenMap, token) => {
              tokenMap[token.address] = token
              return tokenMap
            },
            // must make a copy because reduce modifies the map, and we do not
            // want to make a copy in every iteration
            { ...mapWithoutUrls }
          )
      )
    }

    return mapWithoutUrls
  }, [chainId, userAddedTokens, tokenMap, includeUserAdded])
}

export function useSimpleTokens(): { [address: string]: Token } {
  const allTokens = useCombinedActiveList()

  const tokens = useTokensFromMap(allTokens, true)

  return tokens
}

export function useAllTokens(): { [address: string]: Token } {
  const tokens = useSimpleTokens()
  const { secTokens } = useSecTokens()

  return useMemo(() => ({ ...tokens, ...secTokens }), [tokens, secTokens])
}
export function useOnlySecurityTokens(): { [address: string]: Token } {
  const { secTokens } = useSecTokens()
  return secTokens
}
export function useOnlyUnOwnedSecurityTokens(): { [address: string]: Token } {
  const { secTokens: userSecTokens } = useUserSecTokens()
  const { secTokens } = useSecTokens()
  return omit(secTokens, keys(userSecTokens))
}
export function useOnlyUserSecurityTokens(): { [address: string]: Token } {
  const { secTokens } = useUserSecTokens()
  return secTokens
}
export function useUnsupportedTokens(): { [address: string]: Token } {
  const unsupportedTokensMap = useUnsupportedTokenList()
  return useTokensFromMap(unsupportedTokensMap, false)
}

export function useSearchInactiveTokenLists(search: string | undefined, minResults = 10): WrappedTokenInfo[] {
  const lists = useAllLists()
  const inactiveUrls = useInactiveListUrls()
  const { chainId } = useActiveWeb3React()
  const activeTokens = useAllTokens()
  return useMemo(() => {
    if (!search || search.trim().length === 0) return []
    const tokenFilter = createTokenFilterFunction(search)
    const result: WrappedTokenInfo[] = []
    const addressSet: { [address: string]: true } = {}
    for (const url of inactiveUrls) {
      const list = lists[url].current
      if (!list) continue
      for (const tokenInfo of list.tokens) {
        if (tokenInfo.chainId === chainId && tokenFilter(tokenInfo)) {
          const wrapped = new WrappedTokenInfo(tokenInfo, list) as any
          if (!(wrapped.address in activeTokens) && !addressSet[wrapped.address]) {
            addressSet[wrapped.address] = true
            result.push(wrapped)
            if (result.length >= minResults) return result
          }
        }
      }
    }
    return result
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search])
}

export function useIsTokenActive(token: Token | undefined | null): boolean {
  const activeTokens = useAllTokens()

  if (!activeTokens || !token) {
    return false
  }

  return !!activeTokens[token.address]
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency | undefined | null): boolean {
  const userAddedTokens = useUserAddedTokens()

  if (!currency) {
    return false
  }

  return !!userAddedTokens.find((token) => currency.equals(token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  const address = isEthChainAddress(tokenAddress)

  const tokenContract = useTokenContract(address ? address : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  if (token) return token
  if (!chainId || !address) return undefined
  if (decimals.loading || symbol.loading || tokenName.loading) return null
  if (decimals.result) {
    return new Token(
      chainId,
      address,
      decimals.result[0],
      parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
      parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
    )
  }
  return undefined
}

export function useTokenLoading(tokenAddress?: string): boolean {
  const tokens = useAllTokens()

  const address = isEthChainAddress(tokenAddress)

  const tokenContract = useTokenContract(address ? address : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return decimals.loading || symbol.loading || tokenName.loading || !decimals.result
}

export function useTokenFromMapOrNetwork(tokens: any, tokenAddress?: string | null): Token | null | undefined {
  const address = isValidAddress(tokenAddress || '')
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenFromNetwork = useToken(token ? undefined : address ? address : undefined)

  return tokenFromNetwork ?? token
}

export function useCurrencyFromMap(tokens: any, currencyId?: string | null): Currency | null | undefined {
  const nativeCurrency = useNativeCurrency()
  const { chainId } = useActiveWeb3React()
  const isNative = Boolean(currencyId?.toUpperCase() === nativeCurrency?.symbol)
  const shorthandMatchAddress = useMemo(() => {
    const chain = supportedChainId(chainId || 0)
    return chain && currencyId ? (TOKEN_SHORTHANDS as any)[currencyId.toUpperCase()]?.[chain] : undefined
  }, [chainId, currencyId])

  const token = useTokenFromMapOrNetwork(tokens, isNative ? undefined : shorthandMatchAddress ?? currencyId)

  if (currencyId === null || currencyId === undefined) return currencyId

  // this case so we use our built-in wrapped token instead of wrapped tokens on token lists
  try {
    const wrappedNative = nativeCurrency?.wrapped
    if (wrappedNative?.address?.toUpperCase() === currencyId?.toUpperCase()) return wrappedNative
  } catch (_) {}
  return isNative ? nativeCurrency : token
}

export function useCurrency(currencyId: string | undefined): Currency | null | undefined {
  const tokens = useAllTokens()

  return useCurrencyFromMap(tokens, currencyId)
}
