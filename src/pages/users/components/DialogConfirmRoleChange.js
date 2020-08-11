//
import React from 'react'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core'

export default function DialogConfirmRoleChange ({
  user,
  newRole,
  open,
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
      <DialogTitle>Confirm Role Change</DialogTitle>
      <DialogContent>
        Are you sure you want to change {user.email}'s <br /> role from{' '}
        {user.roles} to {newRole}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => handleConfirm(user, newRole)} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
