import { otpValueExtractor } from 'helpers/otp'

describe('otpValueExtractor', () => {
  it('returns value correclty', () => {
    expect(otpValueExtractor('123456')).toEqual('123456')
  })
})
