import React from 'react'
import { Button } from '@mui/material'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { DialogConfirmReset2FA } from 'app/pages/admin/components/DialogConfirmReset2FA'

export const ActionReset2FA = () => {
  const { open2FADialog, close2FADialog, reset2FAOpen } = useUserActionsDialog()

  return (
    <>
      <Button
        onClick={open2FADialog}
        color='primary'
        variant='contained'
        disableElevation
      >
        RESET 2FA
      </Button>
      <DialogConfirmReset2FA closeDialog={close2FADialog} open={reset2FAOpen} />
    </>
  )
}
