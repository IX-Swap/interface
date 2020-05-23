// @flow
import React, { useState } from 'react';
import IdentityList from './IdentityList';
import CorporateIdentityPreview from './CorporateIdentityPreview';

const authorizeIdentitiesPage = {
  LIST: 'LIST',
  VIEW: 'VIEW',
};

const CorporateIdentities = () => {
  const [page, setPage] = useState(authorizeIdentitiesPage.LIST);
  const [identity, setIdentity] = useState(null);

  const onClickView = (selected) => {
    setIdentity(selected);
    setPage(authorizeIdentitiesPage.VIEW);
  };

  if (page === authorizeIdentitiesPage.LIST) {
    return <IdentityList onClickView={onClickView} />;
  }

  if (page === authorizeIdentitiesPage.VIEW) {
    return (
      <CorporateIdentityPreview
        identity={identity}
        onClickBack={() => setPage(authorizeIdentitiesPage.LIST)}
      />
    );
  }
};

export default CorporateIdentities;
