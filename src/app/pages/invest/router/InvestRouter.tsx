import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import { InvestRoute } from 'app/pages/invest/router/config'
import { CommitmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'
import { AppRoute } from 'components/AppRoute'
import { InvestDSORouter } from 'app/pages/invest/router/InvestDSORouter'
import { ViewListing } from 'app/pages/invest/components/SecondaryMarketTable/ViewListing'
import { InvestOverview } from 'app/pages/invest/pages/InvestOverview'
import { Trading } from '../pages/Trading'
import { RootContainer } from 'ui/RootContainer'
import { useStyles } from 'app/pages/invest/router/InvestRoot.styles'

export const InvestRouter = () => {
  const classes = useStyles()
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
        <RootContainer className={classes.tradeRoot}>
          <Trading />
        </RootContainer>
      </AppRoute>
      <AppRoute path={InvestRoute.tradingRoot}>
        <Redirect to={InvestRoute.trading} />
      </AppRoute>
    </Switch>
  )
}
