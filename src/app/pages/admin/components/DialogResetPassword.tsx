import React from 'react'
import { Typography } from '@mui/material'
import { useResetPassword } from 'app/pages/admin/hooks/useResetPassword'
import { UserActionsDialog } from 'app/pages/admin/components/UserActionsDialog'

export interface DialogResetPasswordProps {
  open: boolean
  closeDialog: () => void
  email: string
  tenantId: string
}

export const DialogResetPassword = ({
  open,
  closeDialog,
  email,
  tenantId
}: DialogResetPasswordProps) => {
  const [resetPassword] = useResetPassword(email, tenantId, closeDialog)

  return (
    <UserActionsDialog
      open={open}
      disableEscapeKeyDown
      closeDialog={closeDialog}
      action={resetPassword}
      actionLabel='RESET'
      title='Are you sure you want to start the password reset?'
    >
      <Typography align='center'>
        We will email the user the instructions and link to reset the password.
      </Typography>
    </UserActionsDialog>
  )
}
