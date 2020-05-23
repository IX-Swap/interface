import React, { useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { CircularProgress, Container } from '@material-ui/core';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { getIdentity } from '../../modules/actions';

// TODO: Consider Corporate Identity
const IdentityLanding = () => {
  const { status, type, shouldCreateNew } = useIdentityState();
  const identityDispatch = useIdentityDispatch();

  useMemo(() => {
    if (status === 'INIT') getIdentity(identityDispatch);
  }, [status, identityDispatch]);

  if (status === 'IDLE') {
    const redirectUrl = shouldCreateNew
      ? '/identity/create'
      : `/identity/${type}`;

    return <Redirect to={redirectUrl} />;
  }

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default IdentityLanding;
