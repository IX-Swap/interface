//
import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box
} from '@material-ui/core'

export default function DialogAuthorizeConfirmation ({
  bank,
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
      <DialogTitle>Confirm Bank Account Action</DialogTitle>
      <DialogContent>
        Are you sure you want to change this bank account's status from{' '}
        <b>{bank.status}</b> to <b>{newStatus}</b>?
        <Box px={4}>
          <p>
            <b>{bank.bankName}</b>
          </p>
          <p>
            <b>Swift:</b>
            &nbsp;{bank.swiftCode}
          </p>
          <p>
            <b>Account:</b>
            &nbsp;{bank.accountHolderName}
          </p>
          <p>
            <b>Account Number:</b>
            &nbsp;{bank.bankAccountNumber}
          </p>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => handleConfirm(bank, newStatus)} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
