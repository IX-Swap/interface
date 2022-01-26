import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import User from 'types/user'
import { privateClassNames } from 'helpers/classnames'

export interface DialogConfirmRoleChangeProps {
  user: User
  newRole: string
  open: boolean
  handleClose: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleConfirm: () => Promise<void>
}

export default function DialogConfirmRoleChange({
  user,
  newRole,
  open,
  handleClose,
  handleConfirm
}: DialogConfirmRoleChangeProps) {
  return (
    <Dialog
      className={privateClassNames()}
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      data-testid='dialog-wrapper'
    >
      <DialogTitle>Confirm Role Change</DialogTitle>
      <DialogContent data-testid='dialog-content'>
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
