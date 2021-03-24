import { CommitmentFormWrapper } from 'app/pages/invest/components/CommitmentFormWrapper'
import { InvestRoute } from 'app/pages/invest/router/config'
import { ViewDSO } from 'app/pages/invest/pages/ViewDSO'
import { NewAppRoute } from 'components/NewAppRoute'
import React from 'react'
import { Switch } from 'react-router'

export const InvestDSORouter = () => {
  return (
    <Switch>
      <NewAppRoute
        breadcrumb='Make Commitment'
        path={InvestRoute.makeInvestment}
      >
        <CommitmentFormWrapper />
      </NewAppRoute>

      <NewAppRoute path={InvestRoute.view}>
        <ViewDSO />
      </NewAppRoute>
    </Switch>
  )
}
