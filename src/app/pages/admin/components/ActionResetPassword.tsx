import React from 'react'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { DialogResetPassword } from 'app/pages/admin/components/DialogResetPassword'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { ManagedUser } from 'types/user'
import { isResetActive } from 'helpers/isResetActive'

export interface ActionResetPasswordProps {
  data: ManagedUser
}

export const ActionResetPassword = ({ data }: ActionResetPasswordProps) => {
  const {
    resetPasswordOpen,
    closeResetPassword,
    openResetPassword
  } = useUserActionsDialog()

  const handleOpenResetPassword = () => {
    const isActive = isResetActive(
      data.isResetActive,
      new Date(data.resetExpiresOn ?? '')
    )
    openResetPassword(isActive)
  }

  return (
    <>
      <ButtonTransparent
        onClick={handleOpenResetPassword}
        variant='contained'
        disableElevation
      >
        START ACCOUNT RESET
      </ButtonTransparent>
      <DialogResetPassword
        email={data.email}
        closeDialog={closeResetPassword}
        open={resetPasswordOpen}
      />
    </>
  )
}
