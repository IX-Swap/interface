import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { IndividualIdentities } from 'app/pages/authorizer/pages/individualIdentities/IndividualIdentities'
import { IndividualAuthorization } from 'app/pages/authorizer/pages/individualIdentities/IndividualAuthorization'

export const AuthorizerIndividualIdentitiesRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Individual Identity Details'
        path='/app/authorizer/individuals/:userId/:individualId/view'
      >
        <IndividualAuthorization />
      </AppRoute>

      <AppRoute exact path={AuthorizerRoute.individualIdentities}>
        <IndividualIdentities />
      </AppRoute>
    </Switch>
  )
}
