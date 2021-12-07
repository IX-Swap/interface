import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { ReportsRoute } from 'app/pages/accounts/pages/reports/router/config'
import { Reports } from 'app/pages/accounts/pages/reports/Reports'

export const ReportsRouter = () => {
  return (
    <Switch>
      <AppRoute path={ReportsRoute.list} exact>
        <Reports />
      </AppRoute>

      <AppRoute
        breadcrumb='Accounts Summary'
        path={ReportsRoute.accountsSummary}
      >
        Accounts Summary
      </AppRoute>

      <AppRoute
        breadcrumb='Trade Confirmation'
        path={ReportsRoute.tradeConfirmation}
      >
        Trade Confirmation
      </AppRoute>

      <AppRoute
        breadcrumb='Aggregated Costs and Charges'
        path={ReportsRoute.aggregateCostsAndCharges}
      >
        Aggregated Costs and Charges
      </AppRoute>

      <AppRoute breadcrumb='Dividends' path={ReportsRoute.dividends}>
        Dividends
      </AppRoute>
    </Switch>
  )
}
