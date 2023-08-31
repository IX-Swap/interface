// import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { Market } from 'app/pages/invest/pages/market/Market'
import { ViewListing } from 'app/pages/invest/pages/ViewListing'
// import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'
import { InvestRoute } from 'app/pages/invest/router/config'
import { InvestDSORouter } from 'app/pages/invest/router/InvestDSORouter'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { RootContainer } from 'ui/RootContainer'
import { Trading } from '../pages/Trading'
// import { OverviewRouter } from './OverviewRouter'
import { PrimaryOfferings } from 'app/pages/invest/pages/PrimaryOfferings'
import CircleIcon from '@mui/icons-material/Circle'

export const InvestRouter = () => {
  const prependInvest = (breadcrumb: string) => (
    <>
      Invest
      <CircleIcon
        sx={{ fontSize: '5px', margin: '8px', verticalAlign: 'middle' }}
      />
      {breadcrumb}
    </>
  )

  return (
    <Switch>
      {/* <AppRoute
        breadcrumb={prependInvest('My Investments')}
        path={InvestRoute.commitments}
      >
        <RootContainer>
          <CommitmentsRouter />
        </RootContainer>
      </AppRoute> */}

      <AppRoute
        breadcrumb={prependInvest('Security Token Offering')}
        path={InvestRoute.view}
      >
        <InvestDSORouter />
      </AppRoute>

      <AppRoute
        breadcrumb={prependInvest('Exchange')}
        exact
        path={InvestRoute.exchange}
      >
        <Market />
      </AppRoute>

      <AppRoute path={InvestRoute.viewListing}>
        <RootContainer>
          <ViewListing />
        </RootContainer>
      </AppRoute>
      {/* <AppRoute exact path={InvestRoute.landing}>
        <RootContainer>
          <InvestLanding />
        </RootContainer>
      </AppRoute> */}
      {/* <AppRoute path={InvestRoute.overview} breadcrumb='Overview'>
        <OverviewRouter />
      </AppRoute> */}
      <AppRoute
        breadcrumb={prependInvest('Primary Offerings')}
        path={InvestRoute.primaryOfferings}
      >
        <PrimaryOfferings />
      </AppRoute>
      <AppRoute
        exact
        path={InvestRoute.trading}
        breadcrumb={prependInvest('OTC Trading Market')}
      >
        <Trading />
      </AppRoute>
      <AppRoute path={InvestRoute.tradingRoot}>
        <Redirect to={InvestRoute.trading} />
      </AppRoute>
    </Switch>
  )
}
