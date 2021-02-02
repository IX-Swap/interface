import { OTPField, OTPFieldProps } from 'components/form/OTPField'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { OTPInputField } from 'components/form/OTPInputField'
import { ErrorMessage } from '@hookform/error-message'

jest.mock('components/form/OTPInputField', () => ({
  OTPInputField: jest.fn(() => null)
}))

jest.mock('@hookform/error-message', () => ({
  ErrorMessage: jest.fn(() => null)
}))

describe('OTPField', () => {
  const onChangeMock = jest.fn()
  const props: OTPFieldProps = {
    label: 'otp label',
    hasHelperText: true,
    helperText: 'otp helper text',
    error: false,
    value: '123456',
    onChange: onChangeMock,
    numInputs: 6,
    variant: 'standard',
    control: { formStateRef: { current: { errors: [] } } }
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OTPField />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<OTPField {...props} />)

    expect(getByText('otp label')).toBeTruthy()
    expect(getByText('otp helper text')).toBeTruthy()
    expect(OTPInputField).toHaveBeenCalledWith(
      {
        fullwidth: true,
        hasErrored: false,
        value: '123456',
        onChange: onChangeMock,
        numInputs: 6,
        variant: 'standard'
      },
      {}
    )

    expect(ErrorMessage).not.toHaveBeenCalled()
  })

  it('renders Error Message when error is true', () => {
    props.error = true
    render(<OTPField {...props} />)

    expect(ErrorMessage).toHaveBeenCalled()
  })
})
