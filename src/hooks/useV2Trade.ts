import { Currency, CurrencyAmount, TradeType } from '@ixswap1/sdk-core'
import { Pair, Trade } from '@ixswap1/v2-sdk'
import { useMemo, useState } from 'react'
import { useSecToken } from 'state/secTokens/hooks'
import { isTradeBetter } from 'utils/isTradeBetter'
import { BETTER_TRADE_LESS_HOPS_THRESHOLD } from '../constants/misc'
import { useAllCurrencyCombinations } from './useAllCurrencyCombinations'
import { PairState, useV2Pairs } from './useV2Pairs'

function useAllCommonPairs(
  currencyA?: Currency,
  currencyB?: Currency,
  tokensToExclude?: string[]
): { isLoading: boolean; allowedPairs: Pair[] } {
  const allCurrencyCombinations = useAllCurrencyCombinations(currencyA, currencyB, tokensToExclude)
  const allPairs = useV2Pairs(allCurrencyCombinations)

  // only pass along valid pairs, non-duplicated pairs
  const allowedPairs = useMemo(
    () =>
      Object.values(
        allPairs
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.EXISTS && result[1]))
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
            return memo
          }, {})
      ),
    [allPairs]
  )
  const isLoading = useMemo(
    () =>
      allPairs.filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.LOADING)).length >
      0,
    [allPairs]
  )

  return { isLoading, allowedPairs }
}

const MAX_HOPS = 3

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export function useV2TradeExactIn(
  currencyAmountIn?: CurrencyAmount<Currency>,
  currencyOut?: Currency,
  { maxHops = MAX_HOPS } = {}
): { V2TradeExactIn: Trade<Currency, Currency, TradeType.EXACT_INPUT> | null; isLoading: boolean } {
  const [tokensToExclude, handleTokensToExclude] = useState<string[]>([])

  const { allowedPairs, isLoading } = useAllCommonPairs(currencyAmountIn?.currency, currencyOut, tokensToExclude)

  const V2TradeExactIn = useMemo(() => {
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      if (maxHops === 1) {
        return (
          Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 1, maxNumResults: 1 })[0] ??
          null
        )
      }
      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade<Currency, Currency, TradeType.EXACT_INPUT> | null = null
      for (let i = 1; i <= maxHops; i++) {
        const currentTrade: Trade<Currency, Currency, TradeType.EXACT_INPUT> | null =
          Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: i, maxNumResults: 1 })[0] ??
          null
        // if current trade is best yet, save it
        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade
        }
      }
      return bestTradeSoFar
    }

    return null
  }, [allowedPairs, currencyAmountIn, currencyOut, maxHops])

  const tokenPath = V2TradeExactIn?.route?.path || []
  const lastButOneToken = tokenPath[tokenPath.length - 2]
  const secToken = useSecToken({ currencyId: lastButOneToken?.address })
  const invalidRoute = tokenPath.length > 2 && Boolean(secToken?.isSecToken)

  if (V2TradeExactIn && secToken && invalidRoute && !tokensToExclude.includes(secToken.address)) {
    handleTokensToExclude((state) => [...state, secToken.address])
    return { V2TradeExactIn: null, isLoading }
  }

  return { V2TradeExactIn, isLoading }
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useV2TradeExactOut(
  currencyIn?: Currency,
  currencyAmountOut?: CurrencyAmount<Currency>,
  { maxHops = MAX_HOPS } = {}
): { V2TradeExactOut: Trade<Currency, Currency, TradeType.EXACT_OUTPUT> | null; isLoading: boolean } {
  const [tokensToExclude, handleTokensToExclude] = useState<string[]>([])

  const { allowedPairs, isLoading } = useAllCommonPairs(currencyIn, currencyAmountOut?.currency, tokensToExclude)

  const V2TradeExactOut = useMemo(() => {
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      if (maxHops === 1) {
        return (
          Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 1, maxNumResults: 1 })[0] ??
          null
        )
      }
      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade<Currency, Currency, TradeType.EXACT_OUTPUT> | null = null
      for (let i = 1; i <= maxHops; i++) {
        const currentTrade =
          Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: i, maxNumResults: 1 })[0] ??
          null
        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade
        }
      }
      return bestTradeSoFar
    }
    return null
  }, [currencyIn, currencyAmountOut, allowedPairs, maxHops])

  const tokenPath = V2TradeExactOut?.route?.path || []
  const lastButOneToken = tokenPath[tokenPath.length - 2]
  const secToken = useSecToken({ currencyId: lastButOneToken?.address })
  const invalidRoute = Boolean(secToken?.isSecToken)

  if (V2TradeExactOut && secToken && invalidRoute && !tokensToExclude.includes(secToken.address)) {
    handleTokensToExclude((state) => [...state, secToken.address])
    return { V2TradeExactOut: null, isLoading }
  }

  return { V2TradeExactOut, isLoading }
}
