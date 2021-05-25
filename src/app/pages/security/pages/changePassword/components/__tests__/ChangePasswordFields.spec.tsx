import React from 'react'
import { render, cleanup } from 'test-utils'
import * as changePasswordHook from '../../hooks/useChangePassword'
import { ChangePassword } from 'app/pages/security/pages/changePassword/ChangePassword'
import { ChangePasswordFields } from 'app/pages/security/pages/changePassword/components/ChangePasswordFields'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('ChangePasswordFields', () => {
  const changePassword = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(changePasswordHook, 'useChangePassword')
      .mockImplementation(() => [changePassword] as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <ChangePasswordFields />
      </Form>
    )
  })

  it('renders fields', () => {
    render(
      <Form>
        <ChangePassword />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: 'password',
        label: 'Old Password',
        name: 'oldPassword'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'password',
        label: 'New Password',
        name: 'newPassword'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        type: 'password',
        label: 'Confirm New Password',
        name: 'confirmPassword'
      }),
      {}
    )
  })
})
