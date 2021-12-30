import { OTPField, OTPFieldProps } from 'components/form/OTPField'
import React from 'react'
import { render } from 'test-utils'
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
    isInputNum: true,
    variant: 'standard',
    control: { formStateRef: { current: { errors: [] } } }
  }

  afterEach(async () => {
    jest.clearAllMocks()
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
        isInputNum: true,
        variant: 'standard',
        shouldAutoFocus: false,
        name: undefined,
        control: expect.any(Object)
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

  it('renders label when as a string', () => {
    const { getByTestId } = render(<OTPField {...props} />)

    expect(getByTestId('otp-field-label')).toHaveTextContent(
      props.label as string
    )
  })

  it('renders custom label component', () => {
    const customLabelId = 'custom-label'
    const labelText = 'OTP Field'
    props.label = <span data-testid={customLabelId}>{labelText}</span>

    const { getByTestId } = render(<OTPField {...props} />)

    expect(getByTestId(customLabelId)).toHaveTextContent(labelText)
  })
})
