import React from 'react'
import { Switch } from 'react-router-dom'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { InvestRoute } from 'app/pages/invest/router/config'
import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'
import { AppRoute } from 'components/AppRoute'
import { InvestDSORouter } from 'app/pages/invest/router/InvestDSORouter'
import { ViewListing } from 'app/pages/invest/components/SecondaryMarketTable/ViewListing'
import { InvestOverview } from 'app/pages/invest/pages/InvestOverview'

export const InvestRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='My Investments' path={InvestRoute.commitments}>
        <CommitmentsRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='View Digital Security Offering'
        path={InvestRoute.view}
      >
        <InvestDSORouter />
      </AppRoute>

      <AppRoute path={InvestRoute.viewListing}>
        <ViewListing />
      </AppRoute>

      <AppRoute exact path={InvestRoute.landing}>
        <InvestLanding />
      </AppRoute>

      <AppRoute path={InvestRoute.overview}>
        <InvestOverview />
      </AppRoute>
      <AppRoute path={InvestRoute.trading}>
        <></>
      </AppRoute>
    </Switch>
  )
}
