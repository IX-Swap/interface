import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import DsoInformation from 'components/Dso/DsoInformation';
import PageTitle from 'components/PageTitle';
import type { Document } from 'context/dso/types';
import { snackbarService } from 'uno-material-ui';
import { useIssuanceState } from '../../modules';
import { downloadFile } from './modules/actions';

const DsoView = () => {
  const { dso } = useIssuanceState();

  // TODO: Fetch instead on redirecting
  if (!dso) {
    return <Redirect to="/issuance" />;
  }

  const onClickDocument = async (document: Document) => {
    try {
      await downloadFile(document);
    } catch (error) {
      snackbarService.showSnackbar(error.message, 'error');
      console.log(error);
    }
  };

  return (
    <Container>
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <DsoInformation
        dso={dso}
        headerButtonAction={() => {}}
        headerButtonText="Edit"
        onClickDocument={onClickDocument}
      />
    </Container>
  );
};

export default DsoView;
