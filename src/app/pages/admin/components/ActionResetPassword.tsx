import React from 'react'
import { DialogResetPassword } from 'app/pages/admin/components/DialogResetPassword'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { ManagedUser } from 'types/user'
import { isResetActive } from 'helpers/isResetActive'
import { Button } from '@mui/material'
import { useServices } from 'hooks/useServices'

export interface ActionResetPasswordProps {
  data: ManagedUser
}

export const ActionResetPassword = ({ data }: ActionResetPasswordProps) => {
  const { sessionService } = useServices()
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
        sx={{ height: '53px' }}
        onClick={handleOpenResetPassword}
        variant='contained'
        color='primary'
        disableElevation
      >
        Reset Password
      </Button>
      <DialogResetPassword
        email={data.email}
        tenantId={sessionService?.get('tenantId')}
        closeDialog={closeResetPassword}
        open={resetPasswordOpen}
      />
    </>
  )
}
