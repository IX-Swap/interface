import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CorporateAuthorization } from 'app/pages/authorizer/pages/corporateIdentities/CorporateAuthorization'
import { CorporateIdentities } from 'app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'
import { EditInvestor } from 'app/pages/identity/pages/EditInvestor/EditInvestor'
import { EditCorporateAccreditation } from 'app/pages/identity/pages/EditCorporateAccreditation/EditCorporateAccreditation'

export const AuthorizerCorporateIdentitiesRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Edit Corporate Accreditation'
        path={AuthorizerRoute.editCorporateAccreditation}
      >
        <EditCorporateAccreditation />
      </AppRoute>

      <AppRoute
        exact
        breadcrumb='Edit Corporate KYC'
        path={AuthorizerRoute.editCorporateIdentity}
      >
        <EditInvestor />
      </AppRoute>

      <AppRoute
        exact
        breadcrumb='View Application'
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
