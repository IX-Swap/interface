import React from 'react'
import { Switch } from 'react-router-dom'
import { CommitmentRoute } from 'app/pages/invest/router/config'
import { InvestCommitmentView } from 'app/pages/invest/pages/InvestCommitmentView'
import { MyCommitments } from 'app/pages/invest/components/MyCommitments'
import { NewAppRoute } from 'components/NewAppRoute'

export const CommitmentsRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='View Commitment' path={CommitmentRoute.view}>
        <InvestCommitmentView />
      </NewAppRoute>

      <NewAppRoute breadcrumb='My Commitments' path={CommitmentRoute.list}>
        <MyCommitments />
      </NewAppRoute>
    </Switch>
  )
}
