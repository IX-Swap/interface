import React from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import CorporateIdentityForm from './CorporateIdentityForm';
import { useIdentityState } from '../../modules';

const CorporateIdentity = () => {
  const { status, corporate } = useIdentityState();

  if (status === 'INIT') {
    return <Redirect to="/identity" />;
  }

  return (
    <Box position="relative">
      {corporate && (
        <Box position="absolute" top="-2.5em" right="0">
          <Typography>
            <b>{corporate.status}</b>
          </Typography>
        </Box>
      )}
      <CorporateIdentityForm />
    </Box>
  );
};

export default CorporateIdentity;
