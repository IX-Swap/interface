import { OTPFields } from 'auth/pages/login/components/OTPFields'
import React from 'react'
import { render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('OTPFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <OTPFields isLoading={false} />
      </Form>
    )
  })

  it('renders OTP', () => {
    render(
      <Form>
        <OTPFields isLoading={false} />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'otp',
        label: 'Enter the 6-digit code from your authenticator app:'
      }),
      {}
    )
  })
})
