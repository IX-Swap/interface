import React from 'react'
import { render, cleanup } from 'test-utils'
import { ActionResetPassword } from 'app/pages/admin/components/ActionResetPassword'
import { managedUser } from '__fixtures__/user'
import * as useUserActionsDialog from 'app/pages/admin/hooks/useUserActionsDialog'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { DialogResetPassword } from 'app/pages/admin/components/DialogResetPassword'

jest.mock('app/components/ButtonTransparent', () => ({
  ButtonTransparent: jest.fn(({ children }) => <>{children}</>)
}))

jest.mock('app/pages/admin/components/DialogResetPassword', () => ({
  DialogResetPassword: jest.fn(() => null)
}))

describe('ActionResetPassword', () => {
  const resetPasswordOpenMock = true
  const closeResetPasswordMock = jest.fn()
  const openResetPasswordMock = jest.fn()

  jest.spyOn(useUserActionsDialog, 'useUserActionsDialog').mockImplementation(
    () =>
      ({
        resetPasswordOpen: resetPasswordOpenMock,
        closeResetPassword: closeResetPasswordMock,
        openResetPassword: openResetPasswordMock
      } as any)
  )

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ActionResetPassword email={managedUser.email} />)
  })

  it('renders components with correct props', () => {
    const { getByText } = render(
      <ActionResetPassword email={managedUser.email} />
    )

    expect(getByText('START ACCOUNT RESET')).toBeTruthy()
    expect(ButtonTransparent).toHaveBeenCalledWith(
      expect.objectContaining({
        onClick: openResetPasswordMock,
        variant: 'contained',
        disableElevation: true
      }),
      {}
    )
    expect(DialogResetPassword).toHaveBeenCalledWith(
      {
        email: managedUser.email,
        closeDialog: closeResetPasswordMock,
        open: resetPasswordOpenMock
      },
      {}
    )
  })
})
