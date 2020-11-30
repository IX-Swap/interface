import React from 'react'
import { cleanup, render } from 'test-utils'
import { TypedField } from 'v2/components/form/TypedField'
import { Form } from 'v2/components/form/Form'
import { ResetFields } from 'v2/auth/pages/password-reset/components/ResetFields'

jest.mock('v2/components/form/TypedField', () => ({
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
