import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { TokenDeployments } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeployments'
import { TokenDeploymentAuthorization } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeploymentAuthorization'

export const TokenDeploymentRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Token Deployment Details'
        path='/app/authorizer/token-deployment/:userId/:dsoId/view'
      >
        <TokenDeploymentAuthorization />
      </AppRoute>

      <AppRoute exact path={AuthorizerRoute.tokenDeployment}>
        <TokenDeployments />
      </AppRoute>
    </Switch>
  )
}
