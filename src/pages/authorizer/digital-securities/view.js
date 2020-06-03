// @flow
import React, { useState, useCallback, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import DsoInformation from 'components/Dso/DsoInformation';
import PageTitle from 'components/PageTitle';
import type { Document, Dso } from 'context/dso/types';
import { snackbarService } from 'uno-material-ui';
import Actions from './modules/actions';
import DialogAuthorizeConfirmation from './confirm';

const { downloadFile, getDso, toggleWithdrawStatus } = Actions;

const ViewDS = ({
  location,
  match: {
    params: { id },
  },
}: RouteProps) => {
  // $FlowFixMe
  const { data } = location.state || {};
  const [dso, setDso] = useState<Dso>(data);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mDso: Dso, status: string) => {
    const confirm = await toggleWithdrawStatus(mDso, status);
    let message = 'Failed to update digital security status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated digital security status!';
      type = 'success';
      const cDso = await getDso(id);

      if (cDso) {
        setDso(cDso);
      }

      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
  };

  const getDsoCallback = useCallback(() => {
    (async (mId) => {
      const mDso = await getDso(mId);

      if (mDso) {
        setDso(mDso);
      }
    })(id);
  }, [id]);

  useEffect(() => {
    if (!data) {
      getDsoCallback();
    }
  }, [data, getDsoCallback]);

  const onClickDocument = async (document: Document) => {
    try {
      await downloadFile(document);
    } catch (error) {
      snackbarService.showSnackbar(error.message, 'error');
      console.log(error);
    }
  };

  return dso && dso.tokenName ? (
    <Container>
      <DialogAuthorizeConfirmation
        open={open}
        withdraw={dso}
        newStatus="approved"
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <DsoInformation
        dso={dso}
        headerButtonAction={() => setOpen(true)}
        headerButtonText="Approve"
        headerButtonShown={dso.status === 'Unauthorized'}
        onClickDocument={onClickDocument}
      />
    </Container>
  ) : (
    <span>loading</span>
  );
};

export default ViewDS;
