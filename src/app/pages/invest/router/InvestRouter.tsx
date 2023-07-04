import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
// import { Market } from 'app/pages/invest/pages/market/Market'
import { ViewListing } from 'app/pages/invest/pages/ViewListing'
import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'
import { InvestRoute } from 'app/pages/invest/router/config'
import { InvestDSORouter } from 'app/pages/invest/router/InvestDSORouter'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { RootContainer } from 'ui/RootContainer'
import { Trading } from '../pages/Trading'
// import { OverviewRouter } from './OverviewRouter'
import { PrimaryOfferings } from 'app/pages/invest/pages/PrimaryOfferings'

export const InvestRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='My Investments' path={InvestRoute.commitments}>
        <RootContainer>
          <CommitmentsRouter />
        </RootContainer>
      </AppRoute>

      <AppRoute breadcrumb='Security Token Offering' path={InvestRoute.view}>
        <InvestDSORouter />
      </AppRoute>

      {/* <AppRoute breadcrumb='Exchange' exact path={InvestRoute.exchange}>
        <Market />
      </AppRoute> */}

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
      {/* <AppRoute path={InvestRoute.overview} breadcrumb='Overview'>
        <OverviewRouter />
      </AppRoute> */}
      <AppRoute
        breadcrumb='Primary Offerings'
        path={InvestRoute.primaryOfferings}
      >
        <PrimaryOfferings />
      </AppRoute>
      <AppRoute
        exact
        path={InvestRoute.trading}
        breadcrumb='OTC Trading Market'
      >
        <Trading />
      </AppRoute>
      <AppRoute path={InvestRoute.tradingRoot}>
        <Redirect to={InvestRoute.trading} />
      </AppRoute>
    </Switch>
  )
}
