import React, { useState } from 'react';
import { Container, Button } from '@material-ui/core';
import type { Identity } from 'pages/identity/modules/types';
import { snackbarService } from 'uno-material-ui';
import AuthorizeConfirmDialog from './AuthorizeConfirmDialog';
import actions from '../modules/actions';

const CorporateIdentityPreview = ({
  onClickBack,
  identity,
}: {
  identity: Identity,
  onClickBack: Function,
}) => {
  const [saving, setSaving] = useState(false);
  const [newStatus, setNewStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setSaving(true);
    const confirm = await actions.toggleIdentityStatus(identity, newStatus);
    let message = 'Failed to update withdraw status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated withdraw status!';
      type = 'success';
      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
  };

  return (
    <Container>
      <Button type="button" disabled={saving} onClick={() => onClickBack()}>
        back
      </Button>

      <Button
        onClick={() => {
          setOpen(true);
          setNewStatus('approve');
        }}
        disabled={saving}
      >
        Approve
      </Button>

      <Button
        onClick={() => {
          setOpen(true);
          setNewStatus('reject');
        }}
        disabled={saving}
      >
        Reject
      </Button>

      <AuthorizeConfirmDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        newStatus={newStatus}
        handleConfirm={handleConfirm}
      />
    </Container>
  );
};

export default CorporateIdentityPreview;
