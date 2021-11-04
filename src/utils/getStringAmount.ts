import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import JSBI from 'jsbi'

export const getStringAmount = (amount: CurrencyAmount<Currency>) => {
  const num = amount.numerator
  const denum = amount.denominator
  const division = JSBI.divide(num, denum)
  return String(division)
}
