import React from 'react'
import { Switch } from 'react-router-dom'
import { CommitmentRoute } from 'app/pages/invest/router/config'
import { InvestCommitmentView } from 'app/pages/invest/pages/InvestCommitmentView'
import { MyCommitments } from 'app/pages/invest/components/MyCommitments'
import { AppRoute } from 'components/AppRoute'

export const CommitmentsRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='View Investment' path={CommitmentRoute.view}>
        <InvestCommitmentView />
      </AppRoute>

      <AppRoute breadcrumb='My Investments' path={CommitmentRoute.list}>
        <MyCommitments />
      </AppRoute>
    </Switch>
  )
}
