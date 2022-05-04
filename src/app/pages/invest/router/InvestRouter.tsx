import { ViewListing } from 'app/pages/invest/components/SecondaryMarketTable/ViewListing'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { InvestOverview } from 'app/pages/invest/pages/InvestOverview'
import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'
import { InvestRoute } from 'app/pages/invest/router/config'
import { InvestDSORouter } from 'app/pages/invest/router/InvestDSORouter'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { RootContainer } from 'ui/RootContainer'
import { Trading } from '../pages/Trading'

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
      <AppRoute exact path={InvestRoute.trading}>
        <Trading />
      </AppRoute>
      <AppRoute path={InvestRoute.tradingRoot}>
        <Redirect to={InvestRoute.trading} />
      </AppRoute>
    </Switch>
  )
}
