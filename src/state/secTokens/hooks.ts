import { Token } from '@ixswap1/sdk-core'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { tokens } from 'services/apiUrls'
import { useApiService } from 'services/useApiService'
import { AppDispatch, AppState } from 'state'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { SecToken } from 'types/secToken'
import { fetchSecTokenList } from './actions'

export function useSecTokenState(): AppState['secTokens'] {
  return useSelector<AppState, AppState['secTokens']>((state) => state.secTokens)
}
export const useFetchSecTokens = () => {
  const { result, loading, request } = useApiService<SecToken[]>({
    method: 'get',
    uri: tokens.all,
    data: {},
  })
  return { result, loading, request }
}

export const getSecTokensList = async () => {
  const result = await apiService.get(tokens.all)
  return result.data
}

const listCache: WeakMap<SecToken[], SecTokenAddressMap> | null =
  typeof WeakMap !== 'undefined' ? new WeakMap<SecToken[], SecTokenAddressMap>() : null

export const useSecTokens = () => {
  const { tokens } = useSecTokenState()
  const secMap = listToSecTokenMap(listCache, tokens)
  const secTokens = useSecTokensFromMap(secMap)
  return { secTokens }
}

export function useFetchSecTokenListCallback(): (sendDispatch?: boolean) => Promise<SecToken[]> {
  const dispatch = useDispatch<AppDispatch>()

  // note: prevent dispatch if using for list search or unsupported list
  return useCallback(
    async (sendDispatch = true) => {
      sendDispatch && dispatch(fetchSecTokenList.pending())
      return getSecTokensList()
        .then((tokenList) => {
          sendDispatch && dispatch(fetchSecTokenList.fulfilled({ tokenList }))
          return tokenList
        })
        .catch((error) => {
          console.debug(`Failed to get sec token list`, error)
          sendDispatch && dispatch(fetchSecTokenList.rejected({ errorMessage: error.message }))
          throw error
        })
    },
    [dispatch]
  )
}

export type SecTokenAddressMap = {
  readonly [x: number]: Readonly<{
    [tokenAddress: string]: {
      token: WrappedTokenInfo
    }
  }>
}

export function listToSecTokenMap(
  cache: WeakMap<SecToken[], SecTokenAddressMap> | null,
  list?: null | SecToken[]
): SecTokenAddressMap {
  if (!list) return {}
  const result = cache?.get(list)
  if (result) return result
  const map = list.reduce<SecTokenAddressMap>((tokenMap, tokenInfo) => {
    const token = new WrappedTokenInfo(tokenInfo, undefined)
    if (tokenMap[token.chainId]?.[token.address] !== undefined) {
      console.error(new Error(`Duplicate token! ${token.address}`))
      return tokenMap
    }
    return {
      ...tokenMap,
      [token.chainId]: {
        ...tokenMap[token.chainId],
        [token.address]: {
          token,
          list,
        },
      },
    }
  }, {})
  cache?.set(list, map)
  return map
}

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
export function useSecTokensFromMap(tokenMap: SecTokenAddressMap): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!tokenMap || chainId === undefined) return {}
    if (!tokenMap[chainId]) return {}
    // reduce to just tokens
    const mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce<{ [address: string]: Token }>((newMap, address) => {
      newMap[address] = tokenMap[chainId][address].token
      return newMap
    }, {})

    return mapWithoutUrls
  }, [tokenMap, chainId])
}
