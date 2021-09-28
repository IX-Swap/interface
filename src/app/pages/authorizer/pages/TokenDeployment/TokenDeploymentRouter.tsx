import React from 'react'
import { Switch } from 'react-router'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { TokenDeployments } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeployments'

export const TokenDeploymentRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Token Deployment Details'
        path='/app/authorizer/token-deployment/:dsoId/view'
      >
        <>View Token Deployment</>
      </AppRoute>

      <AppRoute exact path={AuthorizerRoute.tokenDeployment}>
        <TokenDeployments />
      </AppRoute>
    </Switch>
  )
}
