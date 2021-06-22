import { Currency, CurrencyAmount, Percent, Token } from '@ixswap1/sdk-core'

export interface FormattedAmounts {
  LIQUIDITY_PERCENT: string
  LIQUIDITY: string
  CURRENCY_A: string
  CURRENCY_B: string
}

export interface ParsedAmounts {
  LIQUIDITY_PERCENT: Percent
  LIQUIDITY?: CurrencyAmount<Token> | undefined
  CURRENCY_A?: CurrencyAmount<Currency> | undefined
  CURRENCY_B?: CurrencyAmount<Currency> | undefined
}
