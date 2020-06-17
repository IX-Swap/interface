// @flow
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';

import type { Deposit } from './modules/types';

type Prop = {
  deposit: Deposit,
  newStatus: string,
  open: boolean,
  handleClose: Function,
  handleConfirm: (deposit: Deposit, newStatus: string) => Promise<void>,
};

export default function DialogAuthorizeConfirmation({
  deposit,
  open,
  newStatus,
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
      <DialogTitle>Confirm Deposit Action</DialogTitle>
      <DialogContent>
        Are you sure you want to set this deposit's status to {newStatus}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleConfirm(deposit, newStatus)}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
