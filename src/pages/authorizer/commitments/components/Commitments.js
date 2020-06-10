// @flow
import React, { useState } from 'react';
import CommitmentsList from './CommitmentsList';
import CommitmentView from './CommitmentView';
import IdentityView from './IndentityView';
import DsoView from './DsoView';

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

  const onClickView = (selected) => {
    setCommitment(selected);
    setPage(authorizeCommitmentsPage.VIEW);
  };

  if (page === authorizeCommitmentsPage.LIST) {
    return <CommitmentsList onClickView={onClickView} />;
  }

  if (commitment && page === authorizeCommitmentsPage.VIEW) {
    return (
      <CommitmentView
        commitment={commitment}
        onClickBack={() => setPage(authorizeCommitmentsPage.LIST)}
        onViewIdentity={() => setPage(authorizeCommitmentsPage.VIEW_IDENTITY)}
        onViewDso={() => setPage(authorizeCommitmentsPage.VIEW_DSO)}
      />
    );
  }

  if (
    commitment &&
    commitment.individual &&
    page === authorizeCommitmentsPage.VIEW_IDENTITY
  ) {
    const individual = { ...commitment.individual, user: commitment.user };
    return (
      <IdentityView
        identity={individual}
        onClickBack={() => setPage(authorizeCommitmentsPage.VIEW)}
      />
    );
  }

  if (
    commitment &&
    commitment.dso &&
    page === authorizeCommitmentsPage.VIEW_DSO
  ) {
    return (
      <DsoView
        onClickBack={() => setPage(authorizeCommitmentsPage.VIEW)}
        dso={commitment.dso}
      />
    );
  }
};

export default Commitments;
