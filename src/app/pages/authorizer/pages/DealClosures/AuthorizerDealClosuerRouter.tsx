import React from 'react'
import { Switch } from 'react-router'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { DealClosures } from 'app/pages/authorizer/pages/DealClosures/DealClosures'
import { DealClosureAuthorization } from 'app/pages/authorizer/pages/DealClosures/DealClosureAuthorization'

export const AuthorizerDealClosureRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Deal Closure Details'
        path='/app/authorizer/closure/:userId/:closureId/view'
      >
        <DealClosureAuthorization />
      </AppRoute>

      <AppRoute exact path={AuthorizerRoute.dealClosure}>
        <DealClosures />
      </AppRoute>
    </Switch>
  )
}
