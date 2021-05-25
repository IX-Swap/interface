import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Reset2FAOTPField,
  Reset2FAOTPFieldProps
} from 'app/pages/admin/components/Reset2FAOTPField'
import { OTPInputField } from 'components/form/OTPInputField'

jest.mock('__tests__/form/OTPInputField', () => ({
  OTPInputField: jest.fn(() => null)
}))

describe('PasswordResetOTPField', () => {
  const mockSetOtp = jest.fn()
  const fieldProps: Reset2FAOTPFieldProps = {
    otp: '123456',
    setOtp: mockSetOtp,
    errorMessage: ''
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Reset2FAOTPField {...fieldProps} />)
  })

  it('renders props correctly', () => {
    fieldProps.errorMessage = 'Field Error'

    const { getByText } = render(<Reset2FAOTPField {...fieldProps} />)

    expect(
      'Please enter your OTP from Google Authenticator before proceeding'
    ).toBeTruthy()
    expect(getByText('Field Error')).toBeInTheDocument()

    expect(OTPInputField).toHaveBeenCalledWith(
      expect.objectContaining({
        fullwidth: true,
        hasErrored: true,
        value: '123456',
        numInputs: 6,
        variant: 'outlined'
      }),
      {}
    )
  })
})
