import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import { addressValidator } from 'v2/validation/validators'

describe('addressValidator', () => {
  it('returns false if address is invalid', () => {
    expect(addressValidator(null)).toBe(false)
    expect(addressValidator(undefined)).toBe(false)
    expect(addressValidator('123')).toBe(false)
  })

  it('returns true if address is valid', () => {
    expect(addressValidator(withdrawalAddress.address)).toBe(true)
  })
})
