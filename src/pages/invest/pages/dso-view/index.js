import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import OfferInformation from 'components/Dso/OfferInformation';
import PageTitle from 'components/PageTitle';
import { useInvestState } from '../../modules';

const DsoView = () => {
  const { dso } = useInvestState();

  // TODO: Fetch instead on redirecting
  if (!dso) {
    return <Redirect to="/invest" />;
  }

  return (
    <Container>
      <PageTitle title={dso.tokenName} subPage />
      <Box mb={4} />
      <OfferInformation
        dso={dso}
        headerButtonAction={() => {}}
        headerButtonText="Invest"
      />
    </Container>
  );
};

export default DsoView;
