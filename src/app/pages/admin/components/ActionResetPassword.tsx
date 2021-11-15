import React from 'react'
import { DialogResetPassword } from 'app/pages/admin/components/DialogResetPassword'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { ManagedUser } from 'types/user'
import { isResetActive } from 'helpers/isResetActive'
import { Button } from '@material-ui/core'

export interface ActionResetPasswordProps {
  data: ManagedUser
}

export const ActionResetPassword = ({ data }: ActionResetPasswordProps) => {
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
        onClick={handleOpenResetPassword}
        variant='outlined'
        color='primary'
        disableElevation
      >
        START ACCOUNT RESET
      </Button>
      <DialogResetPassword
        email={data.email}
        closeDialog={closeResetPassword}
        open={resetPasswordOpen}
      />
    </>
  )
}
