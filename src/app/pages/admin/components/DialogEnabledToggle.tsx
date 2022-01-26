import React from 'react'
import { Typography } from '@mui/material'
import { useEnabledToggle } from 'app/pages/admin/hooks/useEnabledToggle'
import { UserActionsDialog } from 'app/pages/admin/components/UserActionsDialog'

export interface DialogEnabledToggleProps {
  open: boolean
  closeDialog: () => void
  enabled: boolean
}

export const DialogEnabledToggle = ({
  open,
  closeDialog,
  enabled
}: DialogEnabledToggleProps) => {
  const [toggleEnabled] = useEnabledToggle(enabled, closeDialog)

  return (
    <UserActionsDialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      closeDialog={closeDialog}
      action={toggleEnabled}
      actionLabel={enabled ? 'DISABLE' : 'ENABLE'}
      title={`Are you sure you want to ${
        enabled ? 'disable' : 'enable'
      } this user?`}
    >
      <Typography align='center'>
        {enabled
          ? 'Disabling a user will result in the user not being able to access this platform anymore.'
          : 'Enabling users will allow them access to this platform again.'}
      </Typography>
    </UserActionsDialog>
  )
}
