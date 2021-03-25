import React from 'react'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CorporateAuthorization } from 'app/pages/authorizer/pages/corporateIdentities/CorporateAuthorization'
import { CorporateIdentities } from 'app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'

export const AuthorizerCorporateIdentitiesRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Individual Identity Details'
        path='/app/authorizer/corporates/:userId/:identityId/view'
      >
        <CorporateAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.corporateIdentities}>
        <CorporateIdentities />
      </NewAppRoute>
    </Switch>
  )
}
