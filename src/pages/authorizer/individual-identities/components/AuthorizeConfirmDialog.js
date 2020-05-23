// @flow
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';

import type { Identity } from 'pages/identity/modules/types';

type Prop = {
  identity: Identity,
  newStatus: string,
  open: boolean,
  handleClose: Function,
  handleConfirm: (identity: Identity, newStatus: string) => Promise<void>,
};

export default function DialogAuthorizeConfirmation({
  identity,
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
      <DialogTitle>Confirm Identity Action</DialogTitle>
      <DialogContent>
        Are you sure you want to set this identity's status to {newStatus}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleConfirm(identity, newStatus)}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
