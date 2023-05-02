import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { IndividualAccreditationAuthorization } from '../IndividualAccreditationAuthorization'
import { IndividualAccreditations } from '../IndividualAccreditations'

export const AuthorizerIndividualAccreditationsRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Individual Accreditation Details'
        path='/app/authorizer/individuals/accreditation/:userId/:individualId/view'
      >
        <IndividualAccreditationAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.individualAccreditations}>
        <IndividualAccreditations />
      </AppRoute>
    </Switch>
  )
}
