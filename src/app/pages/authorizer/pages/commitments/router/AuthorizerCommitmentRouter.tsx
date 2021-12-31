import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CommitmentAuthorization } from 'app/pages/authorizer/pages/commitments/CommitmentAuthorization'
import { Commitments } from 'app/pages/authorizer/pages/commitments/Commitments'

export const AuthorizerCommitmentRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Commitment Details'
        path='/app/authorizer/commitments/:userId/:commitmentId/view'
      >
        <CommitmentAuthorization />
      </AppRoute>

      <AppRoute exact path={AuthorizerRoute.commitments}>
        <Commitments />
      </AppRoute>
    </Switch>
  )
}
