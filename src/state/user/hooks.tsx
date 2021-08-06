import { Currency, Percent, Token, TradeType } from '@ixswap1/sdk-core'
import { Pair, Trade as V2Trade, TradeAuthorizationDigest } from '@ixswap1/v2-sdk'
import { useWeb3React } from '@web3-react/core'
import { SupportedLocale } from 'constants/locales'
import JSBI from 'jsbi'
import flatMap from 'lodash.flatmap'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { tokens } from 'services/apiUrls'
import { saveToken } from 'state/auth/actions'
import { LOGIN_STATUS, useLogin } from 'state/auth/hooks'
import { clearEventLog } from 'state/eventLog/actions'
import {
  listToSecTokenMap,
  SecTokenAddressMap,
  useAreBothSecTokens,
  useIsSecToken,
  useSecTokenId,
  useSecTokensFromMap,
} from 'state/secTokens/hooks'
import { SecToken } from 'types/secToken'
import { currencyId } from 'utils/currencyId'
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '../../constants/routing'
import { useAllTokens } from '../../hooks/Tokens'
import { useActiveWeb3React } from '../../hooks/web3'
import { AppDispatch, AppState } from '../index'
import {
  addSerializedPair,
  addSerializedToken,
  authorizeSecToken,
  clearUserData,
  fetchUserSecTokenList,
  passAccreditation,
  removeSerializedToken,
  saveAccount,
  SerializedPair,
  SerializedToken,
  toggleURLWarning,
  updateUserDarkMode,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserLocale,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance,
} from './actions'

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  )
}

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useSelector<
    AppState,
    { userDarkMode: boolean | null; matchesDarkMode: boolean }
  >(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual
  )

  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useUserLocale(): SupportedLocale | null {
  return useSelector<AppState, AppState['user']['userLocale']>((state) => state.user.userLocale)
}
export function useUserSecTokenState(): SecToken[] | null {
  return useSelector<AppState, AppState['user']['userSecTokens']>((state) => state.user.userSecTokens)
}
export function useUserAccountState(): string {
  return useSelector<AppState, AppState['user']['account']>((state) => state.user.account)
}
export function useUserSecTokenLoading(): boolean {
  return useSelector<AppState, AppState['user']['loadingSecTokenRequest']>((state) => state.user.loadingSecTokenRequest)
}
export function useGetSecTokenAuthorization() {
  return useSelector<AppState, AppState['user']['secTokenAuthorizations']>((state) => state.user.secTokenAuthorizations)
}
export function useUserLocaleManager(): [SupportedLocale | null, (newLocale: SupportedLocale) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const locale = useUserLocale()

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      dispatch(updateUserLocale({ userLocale: newLocale }))
    },
    [dispatch]
  )

  return [locale, setLocale]
}

export function useIsExpertMode(): boolean {
  return useSelector<AppState, AppState['user']['userExpertMode']>((state) => state.user.userExpertMode)
}

export function useExpertModeManager(): { expertMode: boolean; toggleExpertMode: () => void } {
  const dispatch = useDispatch<AppDispatch>()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return { expertMode, toggleExpertMode: toggleSetExpertMode }
}

export function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()

  const singleHopOnly = useSelector<AppState, AppState['user']['userSingleHopOnly']>(
    (state) => state.user.userSingleHopOnly
  )

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly: boolean) => {
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
    },
    [dispatch]
  )

  return [singleHopOnly, setSingleHopOnly]
}

export function useSetUserSlippageTolerance(): (slippageTolerance: Percent | 'auto') => void {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (userSlippageTolerance: Percent | 'auto') => {
      let value: 'auto' | number
      try {
        value =
          userSlippageTolerance === 'auto' ? 'auto' : JSBI.toNumber(userSlippageTolerance.multiply(10_000).quotient)
      } catch (error) {
        value = 'auto'
      }
      dispatch(
        updateUserSlippageTolerance({
          userSlippageTolerance: value,
        })
      )
    },
    [dispatch]
  )
}

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
export function useUserSlippageTolerance(): Percent | 'auto' {
  const userSlippageTolerance = useSelector<AppState, AppState['user']['userSlippageTolerance']>((state) => {
    return state.user.userSlippageTolerance
  })

  return useMemo(
    () => (userSlippageTolerance === 'auto' ? 'auto' : new Percent(userSlippageTolerance, 10_000)),
    [userSlippageTolerance]
  )
}

/**
 * Same as above but replaces the auto with a default value
 * @param defaultSlippageTolerance the default value to replace auto with
 */
export function useUserSlippageToleranceWithDefault(defaultSlippageTolerance: Percent): Percent {
  const allowedSlippage = useUserSlippageTolerance()
  return useMemo(
    () => (allowedSlippage === 'auto' ? defaultSlippageTolerance : allowedSlippage),
    [allowedSlippage, defaultSlippageTolerance]
  )
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userDeadline = useSelector<AppState, AppState['user']['userDeadline']>((state) => {
    return state.user.userDeadline
  })

  const setUserDeadline = useCallback(
    (userDeadline: number) => {
      dispatch(updateUserDeadline({ userDeadline }))
    },
    [dispatch]
  )

  return [userDeadline, setUserDeadline]
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch]
  )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch]
  )
}

export function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  const serializedTokensMap = useSelector<AppState, AppState['user']['tokens']>(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap?.[chainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}

function serializePair(pair: Pair): SerializedPair {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1),
  }
}

export function usePairAdder(): (pair: Pair) => void {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (pair: Pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
    },
    [dispatch]
  )
}

export function useURLWarningVisible(): boolean {
  return useSelector((state: AppState) => state.user.URLWarningVisible)
}

export function useURLWarningToggle(): () => void {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(toggleURLWarning()), [dispatch])
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  return new Token(tokenA.chainId, Pair.getAddress(tokenA, tokenB), 18, 'IXS-V2', 'IXSwap V2')
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

  // pairs for every token against every base
  const generatedPairs: [Token, Token][] = useMemo(
    () =>
      chainId
        ? flatMap(Object.keys(tokens), (tokenAddress) => {
            const token = tokens[tokenAddress]
            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map((base) => {
                  if (base.address === token.address) {
                    return null
                  } else {
                    return [base, token]
                  }
                })
                .filter((p): p is [Token, Token] => p !== null)
            )
          })
        : [],
    [tokens, chainId]
  )

  // pairs saved by users
  const savedSerializedPairs = useSelector<AppState, AppState['user']['pairs']>(({ user: { pairs } }) => pairs)

  const userPairs: [Token, Token][] = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return []
    const forChain = savedSerializedPairs[chainId]
    if (!forChain) return []

    return Object.keys(forChain).map((pairId) => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
    })
  }, [savedSerializedPairs, chainId])

  const combinedList = useMemo(
    () => userPairs.concat(generatedPairs).concat(pinnedPairs),
    [generatedPairs, pinnedPairs, userPairs]
  )

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>((memo, [tokenA, tokenB]) => {
      const sorted = tokenA.sortsBefore(tokenB)
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
      if (memo[key]) return memo
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
      return memo
    }, {})

    return Object.keys(keyed).map((key) => keyed[key])
  }, [combinedList])
}

export const getUserSecTokensList = async () => {
  const result = await apiService.get(tokens.fromUser)
  return result.data
}

export const fetchTokenAuthorization = async (tokenId: number) => {
  const result = await apiService.get(tokens.authorize(tokenId))
  return result.data
}

export const useGetTokenAuthorization = ({ address }: { address: string }) => {
  const tokenId = useSecTokenId({ currencyId: address })
  const authorizations = useGetSecTokenAuthorization()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    if (!tokenId) return null
    const authorization = authorizations[address]
    if (authorization) {
      return authorization
    }
    dispatch(authorizeSecToken.pending())
    try {
      const result = await fetchTokenAuthorization(tokenId)
      dispatch(authorizeSecToken.fulfilled({ data: { address, authorization: result.data } }))
      return result.data
    } catch (e) {
      dispatch(authorizeSecToken.rejected({ errorMessage: e.message }))
      return null
    }
  }, [dispatch, authorizations, tokenId, address])
}

export function useSwapAuthorization(trade: V2Trade<Currency, Currency, TradeType> | undefined) {
  const id0 = trade?.inputAmount?.currency ? currencyId(trade?.inputAmount?.currency) : ''
  const id1 = trade?.outputAmount?.currency ? currencyId(trade?.outputAmount?.currency) : ''
  const getAuthorization0 = useGetTokenAuthorization({ address: id0 })
  const getAuthorization1 = useGetTokenAuthorization({ address: id1 })
  const isSecToken0 = useIsSecToken(id0)
  const isSecToken1 = useIsSecToken(id1)
  const [authorization, setAuthorization] = useState<TradeAuthorizationDigest>()
  useEffect(() => {
    if (isSecToken0) {
      fetchAuthorization0()
    } else if (isSecToken1) {
      fetchAuthorization1()
    }
    async function fetchAuthorization0() {
      const result = await getAuthorization0()
      setAuthorization([result, null])
    }
    async function fetchAuthorization1() {
      const result = await getAuthorization1()
      setAuthorization([null, result])
    }
  }, [getAuthorization0, getAuthorization1, isSecToken1, isSecToken0])
  return authorization
}

export function useSwapIsBothSecTokens(trade?: V2Trade<Currency, Currency, TradeType> | null) {
  const id0 = trade?.inputAmount?.currency ? currencyId(trade?.inputAmount?.currency) : ''
  const id1 = trade?.outputAmount?.currency ? currencyId(trade?.outputAmount?.currency) : ''
  const areBothSecTokens = useAreBothSecTokens({ address0: id0, address1: id1 })
  return areBothSecTokens
}

const listCache: WeakMap<SecToken[], SecTokenAddressMap> | null =
  typeof WeakMap !== 'undefined' ? new WeakMap<SecToken[], SecTokenAddressMap>() : null

export const useUserSecTokens = () => {
  const userSecTokens = useUserSecTokenState()
  const secMap = listToSecTokenMap(listCache, userSecTokens)
  const secTokens = useSecTokensFromMap(secMap)
  return { secTokens }
}

export function useFetchUserSecTokenListCallback(): (sendDispatch?: boolean) => Promise<SecToken[]> {
  const dispatch = useDispatch<AppDispatch>()

  // note: prevent dispatch if using for list search or unsupported list
  return useCallback(
    async (sendDispatch = true) => {
      sendDispatch && dispatch(fetchUserSecTokenList.pending())
      return getUserSecTokensList()
        .then((tokenList) => {
          sendDispatch && dispatch(fetchUserSecTokenList.fulfilled({ tokenList }))
          return tokenList
        })
        .catch((error) => {
          console.debug(`Failed to get sec token list`, error)
          sendDispatch && dispatch(fetchUserSecTokenList.rejected({ errorMessage: error.message }))
          throw error
        })
    },
    [dispatch]
  )
}

export const postPassAccreditation = async ({ tokenId }: { tokenId: number }) => {
  const result = await apiService.post(tokens.accreditation(tokenId), {})
  return result.data
}

export function usePassAccreditation({ tokenId }: { tokenId: number }): () => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  const login = useLogin({ mustHavePreviousLogin: false, expireLogin: false })
  const fetchTokens = useFetchUserSecTokenListCallback()

  // note: prevent dispatch if using for list search or unsupported list
  return useCallback(async () => {
    dispatch(passAccreditation.pending())
    try {
      const status = await login()
      if (status === LOGIN_STATUS.SUCCESS) {
        await postPassAccreditation({ tokenId })
      } else {
        dispatch(passAccreditation.rejected({ errorMessage: 'Could not login' }))
        return
      }
      await fetchTokens()
      dispatch(passAccreditation.fulfilled())
    } catch (error) {
      console.debug(`Failed to pass accreditation`, error)
      dispatch(passAccreditation.rejected({ errorMessage: error.message }))
    }
  }, [dispatch, tokenId, login, fetchTokens])
}

export function useAccount() {
  const savedAccount = useUserAccountState()
  const { account } = useWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const login = useLogin({ mustHavePreviousLogin: true, expireLogin: true })
  const getUserSecTokens = useFetchUserSecTokenListCallback()
  useEffect(() => {
    if (account && savedAccount && savedAccount !== account) {
      dispatch(saveToken({ value: { token: '', expiresAt: 0 } }))
      dispatch(clearUserData())
      dispatch(clearEventLog())
      authenticate()
      dispatch(saveAccount({ account }))
    }

    async function authenticate() {
      const status = await login()
      if (status == LOGIN_STATUS.SUCCESS) {
        getUserSecTokens()
      }
    }
  }, [account, savedAccount, dispatch, login, getUserSecTokens])
}
