import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CommitmentRoute } from 'app/pages/invest/router/config'
import { InvestCommitmentView } from 'app/pages/invest/pages/InvestCommitmentView'
import { MyCommitments } from 'app/pages/invest/components/MyCommitments'

export const CommitmentsRouter = () => {
  return (
    <Switch>
      <Route path={CommitmentRoute.view}>
        <InvestCommitmentView />
      </Route>
      <Route path={CommitmentRoute.list}>
        <MyCommitments />
      </Route>
    </Switch>
  )
}
