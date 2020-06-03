// @flow
import React, { useState } from 'react';
import CommitmentsList from './CommitmentsList';
import CommitmentView from './CommitmentView';
import IdentityView from './IndentityView';

const authorizeCommitmentsPage = {
  LIST: 'LIST',
  VIEW: 'VIEW',
  VIEW_IDENTITY: 'VIEW_IDENTITY',
  VIEW_DSO: 'VIEW_DSO',
};

// TODO: Make the views router based not state based
const Commitments = () => {
  const [page, setPage] = useState(authorizeCommitmentsPage.LIST);
  const [commitment, setCommitment] = useState(null);
  const [identity, setIdentity] = useState(null);

  const onClickView = (selected) => {
    setCommitment(selected);
    setPage(authorizeCommitmentsPage.VIEW);
  };

  const onViewIdentity = (mIdentity) => {
    setIdentity(mIdentity);
    setPage(authorizeCommitmentsPage.VIEW_IDENTITY);
  };

  if (page === authorizeCommitmentsPage.LIST) {
    return <CommitmentsList onClickView={onClickView} />;
  }

  if (commitment && page === authorizeCommitmentsPage.VIEW) {
    return (
      <CommitmentView
        commitment={commitment}
        onClickBack={() => setPage(authorizeCommitmentsPage.LIST)}
        onViewIdentity={onViewIdentity}
      />
    );
  }

  if (identity && page === authorizeCommitmentsPage.VIEW_IDENTITY) {
    return (
      <IdentityView
        identity={identity}
        onClickBack={() => setPage(authorizeCommitmentsPage.VIEW)}
      />
    );
  }
};

export default Commitments;
