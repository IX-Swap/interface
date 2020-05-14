import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function DialogConfirmRoleChange({
  user,
  newRole,
  open,
  handleClose,
  handleConfirm,
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

DialogConfirmRoleChange.propTypes = {
  user: PropTypes.any.isRequired,
  newRole: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
