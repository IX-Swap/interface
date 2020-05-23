import React from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import IndividualIdentityForm from './IndividualIdentityForm';
import { useIdentityState } from '../../modules';

const IndividualIdentity = () => {
  const { status, identity } = useIdentityState();

  if (status === 'INIT') {
    return <Redirect to="/identity" />;
  }

  return (
    <Box>
      {identity && (
        <Box position="absolute" top="-2.5em" right="0">
          <Typography>
            <b>{identity.status}</b>
          </Typography>
        </Box>
      )}
      <IndividualIdentityForm />
    </Box>
  );
};

export default IndividualIdentity;
