import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'

export interface ParsedAmounts {
  INPUT: CurrencyAmount<Currency> | undefined
  OUTPUT: CurrencyAmount<Currency> | undefined
}
