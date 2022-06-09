import {
  formatMoney,
  toPercentage,
  generateRandom,
  formatAmount,
  addSymbol,
  formatTokenBalance,
  isNotNullish,
  formatAmountValue,
  getFilledRoundedPercentage,
  getRoundedPercentage,
  renderTotal,
  getOrderCurrency
} from 'helpers/numbers'
import { order1 } from '__fixtures__/otcOrders'

describe('addSymbol', () => {
  it('returns value with symbol', () => {
    expect(addSymbol(123, 'SGD')).toEqual('SGD 123')
  })

  it('returns value with symbol when right is true', () => {
    expect(addSymbol(123, 'SGD', true)).toEqual('123 SGD')
  })

  it('returns empty string when value is undefined', () => {
    expect(addSymbol(undefined, 'SGD', true)).toEqual('')
  })
})

describe('formatAmount', () => {
  it('returns formatted amount', () => {
    expect(formatAmount(123)).toEqual('123.00')
  })

  it('defaults amount to empty string', () => {
    expect(formatAmount(undefined as any)).toEqual('')
    expect(formatAmount(null as any)).toEqual('')
  })
})

describe('formatMoney', () => {
  it('returns formatted money with symbol', () => {
    expect(formatMoney(123, '$')).toEqual('$ 123.00')
  })

  it('defaults symbol to "SGD"', () => {
    expect(formatMoney(123)).toEqual('SGD 123.00')
  })

  it('defaults amount to empty string', () => {
    expect(formatMoney(null, '$')).toEqual('')
    expect(formatMoney(undefined as any, '$')).toEqual('')
  })

  it('returns formatted money with symbol at end if right is true', () => {
    expect(formatMoney(null, '$', true)).toEqual('')
    expect(formatMoney(123, undefined, true)).toEqual('123.00 SGD')
  })
})

describe('toPercentage', () => {
  it('returns percentage correctly', () => {
    expect(toPercentage(123)).toEqual('12300.00%')
    expect(toPercentage(1)).toEqual('100.00%')
    expect(toPercentage(0.05)).toEqual('5.00%')
  })
})

describe('generateRandom', () => {
  it('returns random string with given length', () => {
    expect(generateRandom(1, 'aA#!')).toEqual(expect.any(String))
    expect(generateRandom(2, 'a#').length).toEqual(2)
    expect(generateRandom(5, 'A!').length).toEqual(5)
  })
})

describe('formatTokenBalance', () => {
  it('returns correct formatted tokenBalance', () => {
    expect(formatTokenBalance(0, 'SGD')).toEqual('SGD 0.00')
    expect(formatTokenBalance(10, 'SGD')).toEqual('SGD 10.00')
    expect(formatTokenBalance(0.999, 'SGD')).toEqual('SGD 0.999')
    expect(formatTokenBalance(undefined, 'SGD')).toEqual('SGD 0.00')
  })
})
describe('isNotNullish', () => {
  it('returns false when value is nullish, and true when it is not', () => {
    expect(isNotNullish(0)).toEqual(false)
    expect(isNotNullish(null)).toEqual(false)
    expect(isNotNullish(undefined)).toEqual(false)
    expect(isNotNullish(5)).toEqual(true)
  })
})

describe('formatAmountValue', () => {
  it('formats value correctly', () => {
    expect(formatAmountValue('45')).toEqual('45')
    expect(formatAmountValue(45)).toEqual(formatAmount(45))
  })
})

describe('getFilledRoundedPercentage', () => {
  it('shows correct value for percentage', () => {
    expect(
      getFilledRoundedPercentage({ amount: 10, availableAmount: 2 })
    ).toEqual('80%'),
      expect(
        getFilledRoundedPercentage({ amount: 27, availableAmount: 13 })
      ).toEqual('52%')
  })
})
describe('getRoundedPercentage', () => {
  it('shows correct value for percentage', () => {
    expect(getRoundedPercentage({ amount: 10, matchedAmount: 2 })).toEqual(
      '20%'
    ),
      expect(getRoundedPercentage({ amount: 27, matchedAmount: 13 })).toEqual(
        '48%'
      )
  })
})

describe('renderTotal', () => {
  it('calculates total correctly', () => {
    expect(renderTotal({ amount: 10, price: 2, row: order1 })).toEqual(
      'USD 20.00'
    )
  })
})

describe('getOrderCurrency', () => {
  it('get correct currency', () => {
    expect(getOrderCurrency(order1)).toEqual('USD')
  })
})
