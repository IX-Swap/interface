import { Currency, CurrencyAmount, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import JSBI from 'jsbi'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import apiService from 'services/apiService'
import { tokens } from 'services/apiUrls'
import { AppDispatch } from 'state'
import { useAccreditationStatus, useAreBothSecTokens, useSecTokenId } from 'state/secTokens/hooks'
import { useSubmitAuthorizationToBrokerDealer } from 'state/swapHelper/hooks'
import { authorizeSecToken } from 'state/user/actions'
import { OrderType } from 'state/user/enum'
import { currencyId } from 'utils/currencyId'
import { useSwapPair } from './useSwapCallback'

export interface AuthorizationParams {
  tokenId: number
  amount: string
  pairAddress?: string
  orderType: string
}

export function useSwapIsBothSecTokens(trade?: V2Trade<Currency, Currency, TradeType> | null) {
  const id0 = trade?.inputAmount?.currency ? currencyId(trade?.inputAmount?.currency) : ''
  const id1 = trade?.outputAmount?.currency ? currencyId(trade?.outputAmount?.currency) : ''
  const areBothSecTokens = useAreBothSecTokens({ address0: id0, address1: id1 })
  return areBothSecTokens
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

interface SwapSecToken {
  usedToken?: number
  amount: string
  orderType: OrderType
  selectedCurrency?: Currency
  firstIsSec: boolean
}
export function useSwapSecToken(
  trade: V2Trade<Currency, Currency, TradeType> | null | undefined,
  allowedSlippage: Percent
): SwapSecToken {
  const inputToken = trade?.inputAmount?.currency
  const outputToken = trade?.outputAmount?.currency
  const firstIsSec = (inputToken as any)?.isSecToken
  const amount0 = trade ? getStringAmount(trade?.maximumAmountIn(allowedSlippage)) : ''
  const amount1 = trade ? getStringAmount(trade?.minimumAmountOut(allowedSlippage)) : ''

  const tokenId0 = useSecTokenId({ currencyId: (inputToken as any)?.address })
  const tokenId1 = useSecTokenId({ currencyId: (outputToken as any)?.address })

  const amount = firstIsSec ? amount0 : amount1
  const orderType = firstIsSec ? OrderType.SELL : OrderType.BUY
  const usedToken = firstIsSec ? tokenId0 : tokenId1
  const selectedCurrency = firstIsSec ? inputToken : outputToken
  return { usedToken, amount, orderType, selectedCurrency, firstIsSec }
}

export function useSwapAuthorize(
  trade: V2Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent,
  formRef: any
) {
  const pair = useSwapPair(trade)
  const getAuthorization = useGetTokenAuthorization()
  const submitToBrokerDealer = useSubmitAuthorizationToBrokerDealer()
  const { usedToken, amount, orderType, selectedCurrency } = useSwapSecToken(trade, allowedSlippage)
  const { accreditationRequest } = useAccreditationStatus((selectedCurrency as any)?.address)

  const fetchAuthorization = useCallback(async () => {
    if (amount && pair?.isSecurity && accreditationRequest) {
      await getSwapAuthorization()
    }
    async function getSwapAuthorization() {
      const pairAddress = pair?.liquidityToken.address
      const result = await getAuthorization({ amount, orderType, pairAddress, tokenId: usedToken })
      submitToBrokerDealer({ ...result, brokerDealerId: (accreditationRequest as any)?.brokerDealerId }, formRef)
    }
  }, [
    getAuthorization,
    pair?.isSecurity,
    pair?.liquidityToken?.address,
    submitToBrokerDealer,
    accreditationRequest,
    usedToken,
    amount,
    orderType,
    formRef,
  ])
  return fetchAuthorization
}
