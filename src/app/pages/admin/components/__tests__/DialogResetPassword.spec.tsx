import React from 'react'
import { render } from 'test-utils'
import {
  DialogResetPassword,
  DialogResetPasswordProps
} from 'app/pages/admin/components/DialogResetPassword'
import { managedUser } from '__fixtures__/user'
import { UserActionsDialog } from 'app/pages/admin/components/UserActionsDialog'
import * as useResetPassword from 'app/pages/admin/hooks/useResetPassword'

jest.mock('app/pages/admin/components/UserActionsDialog', () => ({
  UserActionsDialog: jest.fn(({ children }) => <>{children}</>)
}))

describe('DialogResetPassword', () => {
  const resetPasswordMock = jest.fn()

  jest
    .spyOn(useResetPassword, 'useResetPassword')
    .mockImplementation(() => [resetPasswordMock] as any)

  const mockClose = jest.fn()
  const props: DialogResetPasswordProps = {
    open: true,
    closeDialog: mockClose,
    email: managedUser.email
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls useResetPassword hook with correct ars', () => {
    render(<DialogResetPassword {...props} />)

    expect(useResetPassword.useResetPassword).toHaveBeenCalledWith(
      managedUser.email,
      mockClose
    )
  })

  it('renders components with correct props', () => {
    const { getByText } = render(<DialogResetPassword {...props} />)

    expect(UserActionsDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        closeDialog: mockClose,
        action: resetPasswordMock,
        actionLabel: 'RESET',
        title: 'Are you sure you want to start the password reset?'
      }),
      {}
    )

    expect(
      getByText(
        'We will email the user the instructions and link to reset the password.'
      )
    ).toBeTruthy()
  })
})
