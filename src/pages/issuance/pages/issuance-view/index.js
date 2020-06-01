import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import DsoInformation from 'components/Dso/DsoInformation';
import PageTitle from 'components/PageTitle';
import type { Document } from 'context/dso/types';
import { snackbarService } from 'uno-material-ui';
import { useIssuanceState } from '../../modules';
import { downloadFile, saveIssuance } from './modules/actions';

const DsoView = () => {
  const { dso } = useIssuanceState();
  const [action, setAction] = useState('view');
  const history = useHistory();

  // TODO: Fetch instead on redirecting
  if (!dso) {
    return <Redirect to="/issuance" />;
  }

  const onClickDocument = async (document: Document) => {
    try {
      await downloadFile(document);
    } catch (error) {
      snackbarService.showSnackbar(error.message, 'error');
    }
  };

  const startEdit = () => {
    setAction('edit');
  };

  const saveEdit = async (id, finalData) => {
    const payload = { ...finalData };
    payload.documents = (finalData.documents || []).map((a) => a._id);
    const isGood = await saveIssuance(id, payload);
    const sData = { type: 'error', message: 'Failed to save digital security' };
    if (isGood) {
      sData.type = 'success';
      sData.message = 'Successfully saved digital security';
    }

    snackbarService.showSnackbar(sData.message, sData.type);

    if (isGood) {
      history.goBack();
    }
  };

  return (
    <Container>
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <DsoInformation
        dso={dso}
        action={action}
        headerButtonAction={action === 'edit' ? saveEdit : startEdit}
        headerButtonText={action === 'edit' ? 'Save' : 'Edit'}
        onClickDocument={onClickDocument}
      />
    </Container>
  );
};

export default DsoView;
