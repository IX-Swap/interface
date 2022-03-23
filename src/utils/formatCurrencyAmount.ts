import { Price, CurrencyAmount, Currency, Fraction } from '@ixswap1/sdk-core'
import JSBI from 'jsbi'

export function floorTo4Decimals(num: number) {
  return Math.floor((num + Number.EPSILON) * 10000) / 10000
}
export function floorToDecimals(num: number, decimals = 4) {
  return Math.floor((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals)
}
export function formatCurrencyAmount(amount: CurrencyAmount<Currency> | undefined, sigFigs: number) {
  if (!amount) {
    return '-'
  }

  if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) {
    return '0'
  }

  if (amount.divide(amount.decimalScale).lessThan(new Fraction(1, 100000))) {
    return '<0.00001'
  }
  return formatAmount(+amount.toSignificant(sigFigs))
}

export function formatPrice(price: Price<Currency, Currency> | undefined, sigFigs: number) {
  if (!price) {
    return '-'
  }

  if (parseFloat(price.toFixed(sigFigs)) < 0.0001) {
    return '<0.0001'
  }

  return price.toSignificant(sigFigs)
}

export function formatAmount(amount: number) {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 10 })
}
