import { Button } from '@mui/material'
import { ConfirmationDialog } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/ConfirmationDialog'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface VirtualAssignConfirmationDialogProps {
  onClose: () => void
  open: boolean
  assigning: boolean
}

export const VirtualAssignConfirmationDialog = ({
  onClose,
  open,
  assigning
}: VirtualAssignConfirmationDialogProps) => {
  const { watch } = useFormContext()
  const currency: string = watch('currency', '')

  const title = `We are about to assign you an account in ${currency}`

  const bodyText = 'Would you like to continue?'

  const confirmLabel = 'Yes'
  const confirmButton = (
    <Button
      size='large'
      fullWidth
      type='submit'
      variant='contained'
      color='primary'
      disableElevation
      disabled={assigning}
    >
      {confirmLabel}
    </Button>
  )
  return (
    <ConfirmationDialog
      onClose={onClose}
      open={open}
      assigning={assigning}
      title={title}
      bodyText={bodyText}
      confirmButton={confirmButton}
    />
  )
}
