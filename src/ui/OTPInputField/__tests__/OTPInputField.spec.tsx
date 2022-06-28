import React from 'react'
import { render } from 'test-utils'
import {
  OTPInputField,
  OTPInputFieldProps
} from 'ui/OTPInputField/OTPInputField'

describe('OTPInputField', () => {
  const props: OTPInputFieldProps = {
    name: 'test',
    value: 'value',
    onChange: jest.fn(),
    numInputs: 6,
    isInputNum: true
  }

  it('should match snapshot', () => {
    const { container } = render(<OTPInputField {...props} />)
    expect(container).toMatchSnapshot()
  })
})
