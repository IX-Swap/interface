import React from 'react';
import IdentityList from './components/IdentityList';
import AuthorizerIdentityModule from './modules';

const { AuthorizerIdentityListProvider } = AuthorizerIdentityModule;

const Identities = () => (
  <AuthorizerIdentityListProvider>
    <IdentityList />
  </AuthorizerIdentityListProvider>
);

export default Identities;
