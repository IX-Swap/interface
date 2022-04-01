import { Currency, CurrencyAmount, Price, Token } from '@ixswap1/sdk-core'
import { useMemo } from 'react'
import { USDC } from '../constants/tokens'
import { useV2TradeExactOut } from './useV2Trade'
import { useActiveWeb3React } from './web3'

// USDC amount used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price<Currency, Token> | undefined {
  const { chainId } = useActiveWeb3React()
  const USDC_CURRENCY_AMOUNT_OUT = CurrencyAmount.fromRawAmount(USDC[chainId || 137], 10000)

  const v2USDCTrade = useV2TradeExactOut(currency, USDC_CURRENCY_AMOUNT_OUT, {
    maxHops: 2,
  })

  return useMemo(() => {
    if (!currency || !chainId) {
      return undefined
    }

    // return some fake price data for non-mainnet
    if (chainId !== 1 && chainId !== 137) {
      const fakeUSDC = new Token(chainId, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'fUSDC', 'Fake USDC')
      return new Price(
        currency,
        fakeUSDC,
        10 ** Math.max(0, currency.decimals - 6),
        15 * 10 ** Math.max(6 - currency.decimals, 0)
      )
    }

    // handle usdc
    if (currency?.wrapped.equals(USDC[chainId || 137])) {
      return new Price(USDC[chainId || 137], USDC[chainId || 137], '1', '1')
    }

    if (v2USDCTrade) {
      const { numerator, denominator } = v2USDCTrade.route.midPrice
      return new Price(currency, USDC[chainId || 137], denominator, numerator)
    }

    return undefined
  }, [chainId, currency, v2USDCTrade])
}

export function useUSDCValue(currencyAmount: CurrencyAmount<Currency> | undefined | null) {
  const price = useUSDCPrice(currencyAmount?.currency)

  return useMemo(() => {
    if (!price || !currencyAmount) return null
    try {
      return price.quote(currencyAmount)
    } catch (error) {
      return null
    }
  }, [currencyAmount, price])
}
