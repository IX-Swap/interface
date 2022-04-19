import React from 'react'
import { Switch } from 'react-router-dom'
import { InvestLanding } from 'app/pages/invest/router/InvestLanding'
import { InvestRoute } from 'app/pages/invest/router/config'
import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'
import { AppRoute } from 'components/AppRoute'
import { InvestDSORouter } from 'app/pages/invest/router/InvestDSORouter'
import { ViewListing } from 'app/pages/invest/router/ViewListing'
import { InvestOverview } from 'app/pages/invest/router/InvestOverview'
import { Market } from 'app/pages/invest/pages/market/Market'
import { RootContainer } from 'ui/RootContainer'

export const InvestRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='My Investments' path={InvestRoute.commitments}>
        <RootContainer>
          <CommitmentsRouter />
        </RootContainer>
      </AppRoute>

      <AppRoute
        breadcrumb='View Digital Security Offering'
        path={InvestRoute.view}
      >
        <RootContainer>
          <InvestDSORouter />
        </RootContainer>
      </AppRoute>

      <AppRoute breadcrumb='Exchange' exact path={InvestRoute.exchange}>
        <Market />
      </AppRoute>

      <AppRoute path={InvestRoute.viewListing}>
        <RootContainer>
          <ViewListing />
        </RootContainer>
      </AppRoute>

      <AppRoute exact path={InvestRoute.landing}>
        <RootContainer>
          <InvestLanding />
        </RootContainer>
      </AppRoute>

      <AppRoute path={InvestRoute.overview}>
        <RootContainer>
          <InvestOverview />
        </RootContainer>
      </AppRoute>
    </Switch>
  )
}
