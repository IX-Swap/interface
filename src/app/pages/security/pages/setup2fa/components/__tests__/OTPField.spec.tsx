import React from 'react'
import { cleanup, render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'
import { OTPField } from 'app/pages/security/pages/setup2fa/components/OTPField'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('RequestFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders without error', () => {
    render(
      <Form>
        <OTPField />
      </Form>
    )
  })

  it('renders email field', () => {
    render(
      <Form>
        <OTPField />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'otp',
        label: 'OTP'
      }),
      {}
    )
  })
})
