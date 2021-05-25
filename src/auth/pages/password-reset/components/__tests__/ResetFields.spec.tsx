import React from 'react'
import { cleanup, render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'
import { ResetFields } from 'auth/pages/password-reset/components/ResetFields'

jest.mock('__tests__/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('ResetFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders without error', () => {
    render(
      <Form>
        <ResetFields />
      </Form>
    )
  })

  it('renders email and new password fields', () => {
    render(
      <Form>
        <ResetFields />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'email',
        label: 'Email'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'newPassword',
        label: 'New Password'
      }),
      {}
    )
  })
})
