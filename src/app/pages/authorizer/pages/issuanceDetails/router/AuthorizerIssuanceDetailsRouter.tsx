import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { IssuanceDetails } from 'app/pages/authorizer/pages/issuanceDetails/IssuanceDetails'
import { IssuanceDetailsAuthorization } from 'app/pages/authorizer/pages/issuanceDetails/IssuanceDetailsAuthorization'

export const AuthorizerIssuanceDetailsRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Issuance Details'
        path='/app/authorizer/issuance-details/:userId/:issuanceDetailId/view'
      >
        <IssuanceDetailsAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.issuanceDetails}>
        <IssuanceDetails />
      </AppRoute>
    </Switch>
  )
}
