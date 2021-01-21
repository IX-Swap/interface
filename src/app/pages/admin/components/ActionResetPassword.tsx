import React from 'react'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { DialogResetPassword } from 'app/pages/admin/components/DialogResetPassword'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'

export interface ActionResetPasswordProps {
  email: string
}

export const ActionResetPassword = ({ email }: ActionResetPasswordProps) => {
  const {
    resetPasswordOpen,
    closeResetPassword,
    openResetPassword
  } = useUserActionsDialog()

  return (
    <>
      <ButtonTransparent
        onClick={openResetPassword}
        variant='contained'
        disableElevation
      >
        START ACCOUNT RESET
      </ButtonTransparent>
      <DialogResetPassword
        email={email}
        closeDialog={closeResetPassword}
        open={resetPasswordOpen}
      />
    </>
  )
}
