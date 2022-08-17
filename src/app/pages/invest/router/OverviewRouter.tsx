import { PrimaryOfferings } from 'app/pages/invest/pages/PrimaryOfferings'
import { InvestRoute } from 'app/pages/invest/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'
import { InvestOverview } from '../pages/InvestOverview'
export const OverviewRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='Primary Offerings'
        path={InvestRoute.primaryOfferings}
      >
        <PrimaryOfferings />
      </AppRoute>
      <AppRoute path={InvestRoute.overview} breadcrumb='Overview'>
        <InvestOverview />
      </AppRoute>
    </Switch>
  )
}
