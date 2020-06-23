import React from 'react'
import CorporateIdentities from './components/CorporateIdentities'
import AuthorizerIdentityModule from './modules'

const { AuthorizerIdentityListProvider } = AuthorizerIdentityModule

const Identities = () => (
  <AuthorizerIdentityListProvider>
    <CorporateIdentities />
  </AuthorizerIdentityListProvider>
)

export default Identities
