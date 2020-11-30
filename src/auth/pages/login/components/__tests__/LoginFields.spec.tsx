import React from 'react'
import { cleanup, render } from 'test-utils'
import { LoginFields } from 'auth/pages/login/components/LoginFields'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('LoginFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders without error', () => {
    render(
      <Form>
        <LoginFields />
      </Form>
    )
  })

  it('renders email, password and otp fields', () => {
    render(
      <Form>
        <LoginFields />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'email',
        label: 'Email Address'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'password',
        label: 'Password'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        name: 'otp',
        label: 'OTP Code (optional)'
      }),
      {}
    )
  })
})
