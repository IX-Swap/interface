import React from 'react'
import IndividualIdentities from './components/IndividualIdentities'
import AuthorizerIdentityModule from './modules'

const { AuthorizerIdentityListProvider } = AuthorizerIdentityModule

const Identities = () => (
  <AuthorizerIdentityListProvider>
    <IndividualIdentities />
  </AuthorizerIdentityListProvider>
)

export default Identities
