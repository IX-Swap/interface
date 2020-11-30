import { withdrawValidator } from '../validation'
import { MIN_INVESTMENT_AMOUNT } from 'config/defaults'

describe('withdrawValidator', () => {
  it('returns `Required` if amount is undefined', () => {
    expect(withdrawValidator(undefined, 100)).toEqual({ message: `Required` })
  })

  it("returns `Can't be zero` if amount is zero", () => {
    expect(withdrawValidator(0, 100)).toEqual({
      message: `Can't be zero`
    })
  })

  it('returns `Inssuficient balance` if amount is greater than available', () => {
    expect(withdrawValidator(200, 100)).toEqual({
      message: `Inssuficient balance`
    })
  })

  it('returns `Minimum amount is X` if amount is less than X', () => {
    expect(withdrawValidator(200, 2000, 1000)).toEqual({
      message: `Minimum amount is 1000`
    })
  })

  it('returns `Maximum amount is X` if amount is greater than X', () => {
    expect(withdrawValidator(1500, 2000, 500, 1000)).toEqual({
      message: `Maximum amount is 1000`
    })
  })

  it('returns `undefined` if amount is less than available and less than min', () => {
    expect(withdrawValidator(50, 100)).toEqual({ message: undefined })
  })

  it('returns `undefined` if amount is greater than minimum investment', () => {
    expect(
      withdrawValidator(MIN_INVESTMENT_AMOUNT + 50, MIN_INVESTMENT_AMOUNT + 200)
    ).toEqual({ message: undefined })
  })
})
