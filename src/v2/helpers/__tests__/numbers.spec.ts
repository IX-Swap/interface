import {
  formatMoney,
  toPercentage,
  generateRandom,
  formatAmount
} from 'v2/helpers/numbers'

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
