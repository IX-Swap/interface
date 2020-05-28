// @flow
import React, { useState } from 'react';
import CommitmentsList from './CommitmentsList';
import CommitmentView from './CommitmentView';

const authorizeCommitmentsPage = {
  LIST: 'LIST',
  VIEW: 'VIEW',
};

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
      />
    );
  }
};

export default Commitments;
