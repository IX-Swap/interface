import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import OfferInformation from 'components/Dso/OfferInformation';
import PageTitle from 'components/PageTitle';
import type { Document } from 'context/dso/types';
import { snackbarService } from 'uno-material-ui';
import { useInvestState } from '../../modules';
import { downloadFile } from './modules/actions';

const DsoView = () => {
  const { dso } = useInvestState();

  // TODO: Fetch instead on redirecting
  if (!dso) {
    return <Redirect to="/invest" />;
  }

  const onClickDocument = async (document: Document) => {
    try {
      await downloadFile(document);
    } catch (error) {
      snackbarService.showSnackbar(error.message, 'error');
    }
  };

  return (
    <Container>
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <OfferInformation
        dso={dso}
        headerButtonAction={() => {}}
        headerButtonText="Invest"
        onClickDocument={onClickDocument}
      />
    </Container>
  );
};

export default DsoView;
