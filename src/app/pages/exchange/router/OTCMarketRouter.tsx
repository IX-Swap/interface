import React from 'react'
import { Switch } from 'react-router-dom'
import {
  OTCMarketLandingLinks,
  OTCMarketRoute
} from 'app/pages/exchange/router/config'
import { AppRoute } from 'components/AppRoute'
import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { Market } from '../pages/market/Market'
import { BuyerList } from '../pages/buyer-list/BuyerList'
import { MyHoldings } from 'app/pages/exchange/pages/holdings/MyHoldings'
import { MyListingsRouter } from 'app/pages/exchange/router/MyListingsRouter'

export const OTCMarketRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Market' exact path={OTCMarketRoute.market}>
        <Market />
      </AppRoute>
      <AppRoute breadcrumb='Holdings' path={OTCMarketRoute.holdings}>
        <MyHoldings />
      </AppRoute>
      <AppRoute breadcrumb='My Listings' path={OTCMarketRoute.myListings}>
        <MyListingsRouter />
      </AppRoute>
      <AppRoute breadcrumb='Buyer List' exact path={OTCMarketRoute.buyerList}>
        <BuyerList />
      </AppRoute>
      <AppRoute path={OTCMarketRoute.landing}>
        <LandingPage title='OTC Market' links={OTCMarketLandingLinks} />
      </AppRoute>
    </Switch>
  )
}
