import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import User from 'v2/types/user'

interface DialogConfirmRoleChangeProp {
  user: User
  newRole: string
  open: boolean
  handleClose: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleConfirm: () => Promise<void>
}

export default function DialogConfirmRoleChange ({
  user,
  newRole,
  open,
  handleClose,
  handleConfirm
}: DialogConfirmRoleChangeProp) {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm Role Change</DialogTitle>
      <DialogContent>
        Are you sure you want to change {user.email}&apos;s <br /> role from{' '}
        {user.roles} to {newRole}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={async () => await handleConfirm()} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
