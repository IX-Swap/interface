import React from 'react'
import { render } from 'test-utils'
import * as useUserActionsDialog from 'app/pages/admin/hooks/useUserActionsDialog'
import { DialogConfirmReset2FA } from 'app/pages/admin/components/DialogConfirmReset2FA'
import { ActionReset2FA } from 'app/pages/admin/components/ActionReset2FA'
import * as Button from '@material-ui/core/Button'

jest.mock('app/pages/admin/components/DialogConfirmReset2FA', () => ({
  DialogConfirmReset2FA: jest.fn(() => null)
}))

jest.mock('@material-ui/core/Button', () =>
  jest.fn(({ children }) => <>{children}</>)
)

describe('ActionReset2FA', () => {
  const reset2FAOpenMock = true
  const close2FADialogMock = jest.fn()
  const open2FADialogMock = jest.fn()

  jest.spyOn(useUserActionsDialog, 'useUserActionsDialog').mockImplementation(
    () =>
      ({
        reset2FAOpen: reset2FAOpenMock,
        close2FADialog: close2FADialogMock,
        open2FADialog: open2FADialogMock
      } as any)
  )

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders components with correct props', () => {
    const { getByText } = render(<ActionReset2FA />)

    expect(getByText('RESET 2FA')).toBeTruthy()
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        onClick: open2FADialogMock,
        color: 'primary',
        variant: 'contained',
        disableElevation: true
      }),
      {}
    )
    expect(DialogConfirmReset2FA).toHaveBeenCalledWith(
      {
        closeDialog: close2FADialogMock,
        open: reset2FAOpenMock
      },
      {}
    )
  })
})
