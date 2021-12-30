import React from 'react'
import { render } from 'test-utils'
import {
  DialogConfirmReset2FA,
  DialogConfirmReset2FAProps
} from 'app/pages/admin/components/DialogConfirmReset2FA'
import { UserActionsDialog } from 'app/pages/admin/components/UserActionsDialog'
import * as useReset2FA from 'app/pages/admin/hooks/useReset2FA'
import { Reset2FAOTPField } from 'app/pages/admin/components/Reset2FAOTPField'

jest.mock('app/pages/admin/components/UserActionsDialog', () => ({
  UserActionsDialog: jest.fn(({ children }) => <>{children}</>)
}))

jest.mock('app/pages/admin/components/Reset2FAOTPField', () => ({
  Reset2FAOTPField: jest.fn(() => null)
}))

describe('DialogConfirmReset2FA', () => {
  const reset2FAMock = jest.fn()
  const otpMock = '123456'
  const setOtpMock = jest.fn()
  const errorMessageMock = 'field error'

  jest.spyOn(useReset2FA, 'useReset2FA').mockImplementation(
    () =>
      ({
        mutation: [reset2FAMock],
        otp: otpMock,
        setOtp: setOtpMock,
        errorMessage: errorMessageMock
      } as any)
  )

  const mockClose = jest.fn()
  const props: DialogConfirmReset2FAProps = {
    open: true,
    closeDialog: mockClose
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DialogConfirmReset2FA {...props} />)
  })

  it('calls useReset2FA hook with correct ars', () => {
    render(<DialogConfirmReset2FA {...props} />)

    expect(useReset2FA.useReset2FA).toHaveBeenCalledWith(mockClose)
  })

  it('renders components with correct props', () => {
    const { getByText } = render(<DialogConfirmReset2FA {...props} />)

    expect(UserActionsDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        closeDialog: mockClose,
        actionLabel: 'RESET',
        title: 'Are you sure you want to reset 2-FA?'
      }),
      {}
    )

    expect(
      getByText(
        'Resetting the 2-FA will clear the 2-FA data. The application will ask the user to set up 2-FA again.'
      )
    ).toBeTruthy()
    expect(Reset2FAOTPField).toHaveBeenCalledWith(
      {
        otp: otpMock,
        setOtp: setOtpMock,
        errorMessage: errorMessageMock
      },
      {}
    )
  })
})
