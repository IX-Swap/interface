import React from 'react'
import { Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { Reset2FAOTPField } from 'app/pages/admin/components/Reset2FAOTPField'
import { useReset2FA } from 'app/pages/admin/hooks/useReset2FA'
import { UserActionsDialog } from 'app/pages/admin/components/UserActionsDialog'

export interface DialogConfirmReset2FAProps {
  open: boolean
  closeDialog: () => void
}

export const DialogConfirmReset2FA = ({
  closeDialog,
  open
}: DialogConfirmReset2FAProps) => {
  const {
    mutation: [reset2FA],
    otp,
    setOtp,
    errorMessage
  } = useReset2FA(closeDialog)

  const handleReset = async () => {
    await reset2FA()
  }

  return (
    <UserActionsDialog
      open={open}
      disableEscapeKeyDown
      closeDialog={closeDialog}
      action={handleReset}
      actionLabel={'RESET'}
      title='Are you sure you want to reset 2-FA?'
    >
      <Typography align='center'>
        Resetting the 2-FA will clear the 2-FA data. The application will ask
        the user to set up 2-FA again.
      </Typography>
      <VSpacer size='medium' />
      <Reset2FAOTPField otp={otp} setOtp={setOtp} errorMessage={errorMessage} />
    </UserActionsDialog>
  )
}
