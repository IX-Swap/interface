import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CorporateAuthorization } from 'app/pages/authorizer/pages/corporateIdentities/CorporateAuthorization'
import { CorporateIdentities } from 'app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'

export const AuthorizerCorporateIdentitiesRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Corporate KYC Details'
        path='/app/authorizer/corporates/:userId/:identityId/view'
      >
        <CorporateAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.corporateIdentities}>
        <CorporateIdentities />
      </AppRoute>
    </Switch>
  )
}
