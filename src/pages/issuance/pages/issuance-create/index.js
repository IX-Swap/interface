import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import DsoInformation from 'components/Dso/DsoInformation';
import PageTitle from 'components/PageTitle';
import type { Document } from 'context/dso/types';
import { snackbarService } from 'uno-material-ui';
import { downloadFile, saveIssuance } from './modules/actions';

const DsoView = ({ assets }: any) => {
  const [action, setAction] = useState('create');
  const history = useHistory();

  const onClickDocument = async (document: Document) => {
    try {
      await downloadFile(document);
    } catch (error) {
      snackbarService.showSnackbar(error.message, 'error');
    }
  };

  const save = async (id, finalData) => {
    const payload = { ...finalData };
    payload.documents = (finalData.documents || []).map((a) => a._id);
    const isGood = await saveIssuance(payload);
    const sData = { type: 'error', message: 'Failed to save digital security' };
    if (isGood) {
      sData.type = 'success';
      sData.message = 'Successfully saved digital security';
      history.goBack();
    }

    setAction('create');

    snackbarService.showSnackbar(sData.message, sData.type);
  };

  return (
    <Container>
      <PageTitle title="Create Digital" subPage />
      <Box mb={4} />
      <DsoInformation
        action={action}
        headerButtonAction={save}
        assets={assets}
        headerButtonText="Save"
        onClickDocument={onClickDocument}
      />
    </Container>
  );
};

export default DsoView;
