// @flow
import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core'

type Prop = {
  newStatus: string,
  open: boolean,
  handleClose: Function,
  handleConfirm: () => Promise<void>,
};

export default function DialogAuthorizeConfirmation ({
  open,
  newStatus,
  handleClose,
  handleConfirm
}: Prop) {
  const title =
    newStatus === 'approve'
      ? 'Confirm Approve Commitment'
      : 'Confirm Reject Commitment'

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        Are you sure you want to <b>{newStatus}</b> this commitment?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => handleConfirm()} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
