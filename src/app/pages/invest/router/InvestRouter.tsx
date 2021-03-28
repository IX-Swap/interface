import React from 'react'
import { Switch } from 'react-router-dom'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { InvestRoute } from 'app/pages/invest/router/config'
import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'
import { AppRoute } from 'components/AppRoute'
import { InvestDSORouter } from 'app/pages/invest/router/InvestDSORouter'

export const InvestRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='My Commitments' path={InvestRoute.commitments}>
        <CommitmentsRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='View Digital Security Offering'
        path={InvestRoute.view}
      >
        <InvestDSORouter />
      </AppRoute>

      <AppRoute path={InvestRoute.landing}>
        <InvestLanding />
      </AppRoute>
    </Switch>
  )
}
