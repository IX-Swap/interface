import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CorporateAccreditationAuthorization } from 'app/pages/authorizer/pages/corporateAccreditations/CorporateAccreditationAuthorization'
import { CorporateAccreditations } from 'app/pages/authorizer/pages/corporateAccreditations/CorporateAccreditations'

export const AuthorizerCorporateAccreditationsRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Corporate Accreditation Details'
        path='/app/authorizer/corporates/accreditation/:userId/:identityId/view'
      >
        <CorporateAccreditationAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.corporateAccreditations}>
        <CorporateAccreditations />
      </AppRoute>
    </Switch>
  )
}
