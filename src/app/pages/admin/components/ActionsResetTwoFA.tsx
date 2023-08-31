import React from 'react'
// import { DialogResetPassword } from 'app/pages/admin/components/DialogResetPassword'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { ManagedUser } from 'types/user'
import { isResetActive } from 'helpers/isResetActive'
import { Button } from '@mui/material'
import { DialogConfirmReset2FA } from './DialogConfirmReset2FA'

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
        disabled={!data?.twoFactorAuth}
      >
        Reset 2FA
      </Button>

      <DialogConfirmReset2FA
        closeDialog={closeResetPassword}
        open={resetPasswordOpen}
      />
      {/* <DialogResetPassword
        email={data.email}
        closeDialog={closeResetPassword}
        open={resetPasswordOpen}
      /> */}
    </>
  )
}
