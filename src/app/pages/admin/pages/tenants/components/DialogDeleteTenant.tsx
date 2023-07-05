import React from 'react'
import { UserActionsDialog } from 'app/pages/admin/components/UserActionsDialog'
import { useDeleteTenant } from 'app/pages/admin/hooks/useDeleteTenant'

export interface DialogDeleteTenantProps {
  open: boolean
  closeDialog: () => void
  id: string
}

export const DialogDeleteTenant = ({
  open,
  closeDialog,
  id
}: DialogDeleteTenantProps) => {
  const [deleteTenant] = useDeleteTenant(id, closeDialog)

  return (
    <UserActionsDialog
      open={open}
      disableEscapeKeyDown
      closeDialog={closeDialog}
      action={deleteTenant}
      actionLabel='DELETE'
      title='Are you sure you want to Delete Client Space?'
    ></UserActionsDialog>
  )
}
