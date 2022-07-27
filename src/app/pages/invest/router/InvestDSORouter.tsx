import { InvestRoute } from 'app/pages/invest/router/config'
import { ViewDSO } from 'app/pages/invest/pages/ViewDSO'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'
import { MakeCommitmentPage } from 'app/pages/invest/pages/MakeCommitmentPage'

export const InvestDSORouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Make Commitment' path={InvestRoute.makeInvestment}>
        <MakeCommitmentPage />
      </AppRoute>

      <AppRoute breadcrumb='Digital Security Offering' path={InvestRoute.view}>
        <ViewDSO />
      </AppRoute>
    </Switch>
  )
}
