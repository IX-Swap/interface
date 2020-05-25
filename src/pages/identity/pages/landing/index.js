import React, { useMemo } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { getIdentity } from '../../modules/actions';
import CreateIdentity from './CreateIdentity';
import IdentityPreview from './IdentityPreview';

const IdentityLanding = () => {
  const { status, shouldCreateNew } = useIdentityState();
  const identityDispatch = useIdentityDispatch();

  useMemo(() => {
    if (status === 'INIT') getIdentity(identityDispatch);
  }, [status, identityDispatch]);

  if (status === 'IDLE') {
    return shouldCreateNew ? <CreateIdentity /> : <IdentityPreview />;
  }

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default IdentityLanding;
