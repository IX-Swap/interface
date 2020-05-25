// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import CorporateIdentityForm from './CorporateIdentityForm';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { createIdentity } from '../../modules/actions';

const CorporateIdentity = () => {
  const {
    status,
    corporate,
    editMode,
    corporateDataroom: dataroom,
  } = useIdentityState();
  const identityDispatch = useIdentityDispatch();

  if (status === 'INIT') {
    return <Redirect to="/identity" />;
  }

  const handleOnCreate = (data) => {
    createIdentity(identityDispatch, data, 'corporate');
  };

  return (
    <Box position="relative">
      {corporate && (
        <Box position="absolute" top="-2.5em" right="0">
          <Typography>
            <b>{corporate.status}</b>
          </Typography>
        </Box>
      )}
      <CorporateIdentityForm
        editMode={editMode}
        corporate={corporate}
        handleCreateIdentity={handleOnCreate}
        dataroom={dataroom}
      />
    </Box>
  );
};

export default CorporateIdentity;
