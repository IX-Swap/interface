import { Button } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ConfirmationDialog } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/ConfirmationDialog'

export interface VirtualAssignConfirmationDialogProps {
  onClose: () => void
  open: boolean
  assigning: boolean
  isAdditional?: boolean
}

export const VirtualAssignConfirmationDialog = ({
  onClose,
  open,
  assigning,
  isAdditional = false
}: VirtualAssignConfirmationDialogProps) => {
  const { watch } = useFormContext()
  const currency: string = watch('currency', '')

  const title = isAdditional
    ? 'Request for New Account'
    : `We are about to assign you an account in ${currency}`

  const bodyText = isAdditional
    ? 'You can have a new account in a different currency. Click on “send request” to continue.'
    : 'Would you like to continue?'

  const confirmLabel = isAdditional ? 'Send request' : 'Yes'
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
