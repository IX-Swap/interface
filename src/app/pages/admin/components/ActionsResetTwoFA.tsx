import React from 'react'
import { DialogResetPassword } from 'app/pages/admin/components/DialogResetPassword'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { ManagedUser } from 'types/user'
import { isResetActive } from 'helpers/isResetActive'
import { Button } from '@mui/material'

export interface ActionResetTwoFAProps {
  data: ManagedUser
}

export const ActionResetTwoFA = ({ data }: ActionResetTwoFAProps) => {
  const { resetPasswordOpen, closeResetPassword, openResetPassword } =
    useUserActionsDialog()

  const handleOpenResetPassword = () => {
    const isActive = isResetActive(
      data.isResetActive,
      new Date(data.resetExpiresOn ?? '')
    )
    openResetPassword(isActive)
  }

  return (
    <>
      <Button
        sx={{ height: '53px', width: '159px' }}
        onClick={handleOpenResetPassword}
        variant='contained'
        color='primary'
        disableElevation
      >
        Reset 2FA
      </Button>
      <DialogResetPassword
        email={data.email}
        closeDialog={closeResetPassword}
        open={resetPasswordOpen}
      />
    </>
  )
}
