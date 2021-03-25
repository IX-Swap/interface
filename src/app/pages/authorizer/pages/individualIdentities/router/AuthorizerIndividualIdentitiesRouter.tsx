import React from 'react'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { IndividualIdentities } from 'app/pages/authorizer/pages/individualIdentities/IndividualIdentities'
import { IndividualAuthorization } from 'app/pages/authorizer/pages/individualIdentities/IndividualAuthorization'

export const AuthorizerIndividualIdentitiesRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Individual Identity Details'
        path='/app/authorizer/individuals/:userId/:individualId/view'
      >
        <IndividualAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.individualIdentities}>
        <IndividualIdentities />
      </NewAppRoute>
    </Switch>
  )
}
