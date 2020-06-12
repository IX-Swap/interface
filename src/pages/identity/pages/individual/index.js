// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import IndividualIdentityForm from './IndividualIdentityForm';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { createIdentity, toggleEditMode } from '../../modules/actions';

const IndividualIdentity = () => {
  const { status, identity, editMode, dataroom } = useIdentityState();
  const identityDispatch = useIdentityDispatch();

  const handleOnCreate = (data: any) => {
    createIdentity(identityDispatch, data, 'individual');
  };

  if (status === 'INIT') {
    return <Redirect to="/identity" />;
  }

  return (
    <Box position="relative">
      {identity && !editMode && (
        <Box position="absolute" top="-3em" right="0">
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleEditMode(identityDispatch, true)}
          >
            Edit
          </Button>
        </Box>
      )}
      <IndividualIdentityForm
        useOwnEmail
        dataroom={dataroom}
        editMode={editMode}
        identity={identity}
        handleCreateIdentity={handleOnCreate}
        onCancelEdit={() => toggleEditMode(identityDispatch, false)}
      />
    </Box>
  );
};

export default IndividualIdentity;
