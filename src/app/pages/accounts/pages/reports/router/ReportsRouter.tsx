import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { ReportsRoute } from 'app/pages/accounts/pages/reports/router/config'
import { Reports } from 'app/pages/accounts/pages/reports/Reports'
import { AccountsSummary } from 'app/pages/accounts/pages/reports/AccountsSummary'
import { TradeConfirmation } from 'app/pages/accounts/pages/reports/TradeConfirmation'
import { AggregatedCostsAndCharges } from 'app/pages/accounts/pages/reports/AggregatedCostsAndCharges'
import { Dividends } from 'app/pages/accounts/pages/reports/Dividends'
import { RootContainer } from 'ui/RootContainer'

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
        <AccountsSummary />
      </AppRoute>

      <AppRoute
        breadcrumb='Trade Confirmation'
        path={ReportsRoute.tradeConfirmation}
      >
        <TradeConfirmation />
      </AppRoute>

      <AppRoute
        breadcrumb='Aggregated Costs and Charges'
        path={ReportsRoute.aggregateCostsAndCharges}
      >
        <AggregatedCostsAndCharges />
      </AppRoute>

      <AppRoute breadcrumb='Dividends' path={ReportsRoute.dividends}>
        <Dividends />
      </AppRoute>
    </Switch>
  )
}
