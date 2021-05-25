import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'
import {
  AlertAndOTP,
  AlertAndOTPProps
} from 'app/pages/accounts/pages/banks/components/AlertAndOTP'
import { TypedField } from 'components/form/TypedField'

jest.mock('__tests__/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('Preview', () => {
  const props: AlertAndOTPProps = {
    alert: jest.fn(() => null)
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <AlertAndOTP {...props} />
      </Form>
    )
  })

  it('renders alert and otp input', () => {
    render(
      <Form>
        <AlertAndOTP {...props} />
      </Form>
    )

    expect(props.alert).toHaveBeenCalled()
    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'otp',
        label: '2-Factor Auth Code'
      }),
      {}
    )
  })
})
