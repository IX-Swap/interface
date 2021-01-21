import React from 'react'
import { render, cleanup } from 'test-utils'
import { OTPField, OTPFieldProps } from 'app/pages/admin/components/OTPField'
import { fireEvent } from '@testing-library/react'

describe('OTPField', () => {
  const mockSetOtp = jest.fn()
  const fieldProps: OTPFieldProps = {
    otp: '123456',
    setOtp: mockSetOtp,
    errorMessage: ''
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OTPField {...fieldProps} />)
  })

  it('renders props correctly', () => {
    fieldProps.errorMessage = 'Field Error'

    const { getByText, getAllByText, container } = render(
      <OTPField {...fieldProps} />
    )

    expect(
      'Please enter your OTP from Google Authenticator before proceeding'
    ).toBeTruthy()
    expect(getAllByText('OTP')).toBeTruthy()
    expect(getByText('Field Error')).toBeInTheDocument()

    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: '654321' } })
    expect(mockSetOtp).toHaveBeenCalled()
  })
})
