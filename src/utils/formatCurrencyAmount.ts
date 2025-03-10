import { CurrencyAmount, Currency, Fraction } from '@ixswap1/sdk-core'
import { BigNumber, utils } from 'ethers'
import JSBI from 'jsbi'
import Big from 'big.js'

export function floorTo4Decimals(num: number) {
  return Math.floor((num + Number.EPSILON) * 10000) / 10000
}
export function floorToDecimals(num: number, decimals = 4) {
  return new Big(num).round(decimals, Big.roundDown).toString()
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

  return formatAmount(+amount.toFixed(sigFigs))
}

export function formatPrice(price: any | undefined, sigFigs: number) {
  if (!price) {
    return '-'
  }

  if (parseFloat(price.toFixed(sigFigs)) < 0.0001) {
    return '<0.0001'
  }

  return price.toFixed(sigFigs)
}

export function formatAmount(amount: number, maximumFractionDigits = 10) {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits })
}

export function safeParseUnits(value: number, decimals = 1): BigNumber {
  return utils.parseUnits(floorToDecimals(value, decimals).toString(), decimals)
}
