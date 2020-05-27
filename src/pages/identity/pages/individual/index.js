// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import IndividualIdentityForm from './IndividualIdentityForm';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { createIdentity } from '../../modules/actions';

const IndividualIdentity = () => {
  const { status, identity, editMode, dataroom } = useIdentityState();
  const identityDispatch = useIdentityDispatch();

  const handleOnCreate = (data: any) => {
    createIdentity(identityDispatch, data, 'individual');
  };

  if (status === 'INIT') {
    return <Redirect to="/identity" />;
  }

  console.log('im here');

  return (
    <Box position="relative">
      {identity && (
        <Box position="absolute" top="-2.5em" right="0">
          <Typography>
            <b>{identity.status}</b>
          </Typography>
        </Box>
      )}
      <IndividualIdentityForm
        dataroom={dataroom}
        editMode={editMode}
        identity={identity}
        handleCreateIdentity={handleOnCreate}
      />
    </Box>
  );
};

export default IndividualIdentity;
