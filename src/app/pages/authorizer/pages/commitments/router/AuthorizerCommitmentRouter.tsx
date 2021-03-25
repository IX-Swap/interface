import React from 'react'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CommitmentAuthorization } from 'app/pages/authorizer/pages/commitments/CommitmentAuthorization'
import { Commitments } from 'app/pages/authorizer/pages/commitments/Commitments'

export const AuthorizerCommitmentRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Commitment Details'
        path='/app/authorizer/commitments/:userId/:commitmentId/view'
      >
        <CommitmentAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.commitments}>
        <Commitments />
      </NewAppRoute>
    </Switch>
  )
}
