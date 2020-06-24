// @flow
import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core'

import type { DSWithdrawal } from './modules/types'

type Prop = {
  withdraw: DSWithdrawal,
  newStatus: string,
  open: boolean,
  handleClose: Function,
  handleConfirm: (withdraw: DSWithdrawal, newStatus: string) => Promise<void>,
};

export default function DialogAuthorizeConfirmation ({
  withdraw,
  open,
  newStatus,
  handleClose,
  handleConfirm
}: Prop) {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm Withdrawal Action</DialogTitle>
      <DialogContent>
        Are you sure you want to set this withrawal's status to {newStatus}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => handleConfirm(withdraw, newStatus)}
          color='primary'
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
