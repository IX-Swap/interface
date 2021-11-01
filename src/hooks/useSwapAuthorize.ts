import { Currency, CurrencyAmount, Percent, Token, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import JSBI from 'jsbi'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import apiService from 'services/apiService'
import { tokens } from 'services/apiUrls'
import { AppDispatch } from 'state'
import { setAuthorizationInProgress, setLoadingSwap } from 'state/swapHelper/actions'
import { useSubmitBrokerDealerForm, useSwapSecPairs } from 'state/swapHelper/hooks'
import { authorizeSecToken } from 'state/user/actions'
import { OrderType } from 'state/user/enum'
import { useUserSecTokens } from 'state/user/hooks'

export interface AuthorizationParams {
  tokenId: number
  amount: string
  pairAddress?: string
  orderType: string
}

export const fetchTokenAuthorization = async ({ tokenId, amount, pairAddress, orderType }: AuthorizationParams) => {
  const result = await apiService.post(tokens.authorize(tokenId), { amount, pairAddress, orderType })
  return result.data
}

export const useGetTokenAuthorization = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async ({
      amount,
      pairAddress,
      orderType,
      tokenId,
    }: {
      amount: string
      pairAddress?: string
      orderType: OrderType
      tokenId?: number
    }) => {
      if (!tokenId || !amount || !pairAddress || !orderType) return null
      dispatch(authorizeSecToken.pending())
      try {
        const result = await fetchTokenAuthorization({ tokenId, amount, pairAddress, orderType })
        dispatch(authorizeSecToken.fulfilled())
        return result
      } catch (e) {
        dispatch(authorizeSecToken.rejected({ errorMessage: e.message }))
        return null
      }
    },
    [dispatch]
  )
}

const getStringAmount = (amount: CurrencyAmount<Currency>) => {
  const num = amount.numerator
  const denum = amount.denominator
  const division = JSBI.divide(num, denum)
  return String(division)
}

export function getAuthorizationFirstStepDto(
  trade: V2Trade<Currency, Currency, TradeType> | null | undefined,
  allowedSlippage: Percent,
  token?: Token | null
) {
  const inputToken = trade?.inputAmount?.currency
  const outputToken = trade?.outputAmount?.currency
  const amount0 = trade ? getStringAmount(trade?.maximumAmountIn(allowedSlippage)) : ''
  const amount1 = trade ? getStringAmount(trade?.minimumAmountOut(allowedSlippage)) : ''
  const isFirst = token?.address === inputToken?.wrapped.address
  const isLast = token?.address === outputToken?.wrapped.address
  if (isFirst) {
    return {
      usedToken: (token as any).tokenInfo?.id,
      amount: amount0,
      orderType: OrderType.SELL,
      selectedCurrency: inputToken,
      firstIsSec: true,
    }
  }
  if (isLast) {
    return {
      usedToken: (token as any).tokenInfo?.id,
      amount: amount1,
      orderType: OrderType.BUY,
      selectedCurrency: outputToken,
      firstIsSec: false,
    }
  }
  return null
}

export function useSwapAuthorizeFirstStep(
  trade: V2Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent,
  formRef: any
) {
  const pairs = useSwapSecPairs(trade)
  const getAuthorization = useGetTokenAuthorization()
  const submitToBrokerDealer = useSubmitBrokerDealerForm()
  const { secTokens } = useUserSecTokens()
  const dispatch = useDispatch<AppDispatch>()

  const fetchAuthorization = useCallback(
    async (token: Token) => {
      await getSwapAuthorization()
      async function getSwapAuthorization() {
        try {
          const dto = getAuthorizationFirstStepDto(trade, allowedSlippage, token)
          const isSecToken = Boolean(secTokens[token.address])
          if (!isSecToken || !dto || (pairs[0] === null && pairs[1] === null)) {
            return
          }
          const { usedToken, amount, orderType, firstIsSec } = dto
          const tokenInfo = (token as any)?.tokenInfo
          const accreditationRequest = tokenInfo?.accreditationRequest
          const brokerDealerId = (accreditationRequest as any)?.brokerDealerId
          const pair = firstIsSec ? pairs?.[0] : pairs?.[1]
          const pairAddress = pair?.liquidityToken?.address
          if (!amount || brokerDealerId === undefined || !pairAddress) {
            return
          }
          dispatch(setLoadingSwap({ isLoading: true }))

          dispatch(
            setAuthorizationInProgress({
              authorizationInProgress: {
                amount,
                orderType,
                pairAddress,
                tokenAddress: tokenInfo?.address,
                tokenId: tokenInfo?.id,
                brokerDealerId,
              },
            })
          )
          const result = await getAuthorization({ amount, orderType, pairAddress, tokenId: usedToken })
          submitToBrokerDealer({
            dto: { ...result, brokerDealerId },
            formRef,
          })
        } catch (e) {
          dispatch(setLoadingSwap({ isLoading: false }))
          dispatch(setAuthorizationInProgress({ authorizationInProgress: null }))
        }
      }
    },
    [getAuthorization, pairs, submitToBrokerDealer, allowedSlippage, secTokens, trade, formRef]
  )
  return fetchAuthorization
}
