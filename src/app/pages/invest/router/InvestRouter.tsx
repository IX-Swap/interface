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
      <AppRoute breadcrumb='My Commitments' path={InvestRoute.commitments}>
        <CommitmentsRouter />
      </AppRoute>

      <AppRoute
        exact
        breadcrumb='View Digital Security Offering'
        path={InvestRoute.view}
      >
        <InvestDSORouter />
      </AppRoute>

      <AppRoute breadcrumb='View Listing' exact path={InvestRoute.viewListing}>
        <ViewListing />
      </AppRoute>

      <AppRoute exact path={InvestRoute.landing}>
        <InvestLanding />
      </AppRoute>

      <AppRoute exact path={InvestRoute.overview}>
        <InvestOverview />
      </AppRoute>
    </Switch>
  )
}
