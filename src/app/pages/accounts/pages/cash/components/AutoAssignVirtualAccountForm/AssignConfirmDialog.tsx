import { Button } from '@mui/material'
import React from 'react'
import { ConfirmationDialog } from './ConfirmationDialog'

export interface AssignConfirmDialogProps {
  onClose: () => void
  handleSubmit: () => Promise<void>
  open: boolean
  assigning: boolean
  currency: string
}

export const AssignConfirmDialog = ({
  onClose,
  handleSubmit,
  open,
  assigning,
  currency = 'SGD'
}: AssignConfirmDialogProps) => {
  const title = `Add ${currency} account`
  const bodyText = `Do you want to assign a ${currency} account?`
  const confirmLabel = 'Assign'
  const confirmButton = (
    <Button
      size='large'
      fullWidth
      onClick={handleSubmit}
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
