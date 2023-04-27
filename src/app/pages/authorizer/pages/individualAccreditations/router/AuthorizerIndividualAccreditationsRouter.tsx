import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
// import { CorporateAccreditations } from 'app/pages/authorizer/pages/corporateAccreditations/CorporateAccreditations'
import { IndividualAccreditationAuthorization } from '../IndividualAccreditationAuthorization'
import { IndividualAccreditations } from '../IndividualAccreditations'

export const AuthorizerIndividualAccreditationsRouter = () => {
  console.log('inside accreditations')
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Individual Accreditation Details'
        path='/app/authorizer/individuals/accreditation/:userId/:identityId/view'
      >
        <IndividualAccreditationAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.individualAccreditations}>
        <IndividualAccreditations />
      </AppRoute>
    </Switch>
  )
}
