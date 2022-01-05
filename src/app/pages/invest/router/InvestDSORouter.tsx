import { CommitmentFormWrapper } from 'app/pages/invest/components/CommitmentFormWrapper'
import { InvestRoute } from 'app/pages/invest/router/config'
import { ViewDSO } from 'app/pages/invest/pages/ViewDSO'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'

export const InvestDSORouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Make Commitment' path={InvestRoute.makeInvestment}>
        <CommitmentFormWrapper />
      </AppRoute>

      <AppRoute path={InvestRoute.view}>
        <ViewDSO />
      </AppRoute>
    </Switch>
  )
}
