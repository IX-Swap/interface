// @flow
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import type { User } from '../modules/types';

type Prop = {
  user: User,
  newRole: string,
  open: boolean,
  handleClose: Function,
  handleConfirm: (user: User, newRole: string) => Promise<void>,
};

export default function DialogConfirmRoleChange({
  user,
  newRole,
  open,
  handleClose,
  handleConfirm,
}: Prop) {
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleConfirm(user, newRole)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
