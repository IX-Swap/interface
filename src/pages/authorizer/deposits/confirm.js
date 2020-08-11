//
import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core'

export default function DialogAuthorizeConfirmation ({
  deposit,
  open,
  newStatus,
  handleClose,
  handleConfirm
}) {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm Deposit Action</DialogTitle>
      <DialogContent>
        Are you sure you want to set this deposit's status to {newStatus}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => handleConfirm(deposit, newStatus)}
          color='primary'
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
