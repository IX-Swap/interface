import React from 'react'
import { render } from 'test-utils'
import { ActionResetPassword } from 'app/pages/admin/components/ActionResetPassword'
import { managedUser } from '__fixtures__/user'
import * as useUserActionsDialog from 'app/pages/admin/hooks/useUserActionsDialog'
import { DialogResetPassword } from 'app/pages/admin/components/DialogResetPassword'
import { fireEvent } from '@testing-library/react'

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
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ActionResetPassword data={managedUser} />)
  })

  it('renders components with correct props', () => {
    const date = new Date()

    const { getByText } = render(
      <ActionResetPassword
        data={{
          ...managedUser,
          resetExpiresOn: date.setDate(date.getDate() - 30).toLocaleString()
        }}
      />
    )
    expect(getByText('START ACCOUNT RESET')).toBeTruthy()

    fireEvent(
      getByText('START ACCOUNT RESET'),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )
    expect(openResetPasswordMock).toHaveBeenCalled()
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
