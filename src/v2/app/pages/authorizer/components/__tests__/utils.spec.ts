import { convertAddressToString } from 'v2/app/pages/authorizer/components/utils'
import { address } from '__fixtures__/authorizer'

describe('convertAddressToString', () => {
  it('returns empty string if address is undefined', () => {
    expect(convertAddressToString(undefined)).toBe('')
  })

  it('returns address string if address is defined', () => {
    expect(convertAddressToString(address)).toBe(
      'Address line 1 Address line 2 Omsk 123456 Siberia Russian Federation'
    )
  })

  it('returns address string if address is defined and line2 is undefined', () => {
    expect(convertAddressToString({ ...address, line2: undefined })).toBe(
      'Address line 1  Omsk 123456 Siberia Russian Federation'
    )
  })

  it('returns address string if address is defined and postalCode is undefined', () => {
    expect(convertAddressToString({ ...address, postalCode: undefined })).toBe(
      'Address line 1 Address line 2 Omsk  Siberia Russian Federation'
    )
  })
})
