import React from 'react'
import { Switch } from 'react-router-dom'
import {
  OTCMarketLandingLinks,
  OTCMarketRoute
} from 'app/pages/exchange/router/config'
import { AppRoute } from 'components/AppRoute'
import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { Market } from '../pages/market/Market'
import { Holdings } from '../pages/holdings/Holdings'
import { MyListings } from '../pages/my-listings/MyListings'
import { BuyerList } from '../pages/buyer-list/BuyerList'

export const OTCMarketRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Market' path={OTCMarketRoute.market}>
        <Market />
      </AppRoute>
      <AppRoute breadcrumb='Holdings' path={OTCMarketRoute.holdings}>
        <Holdings />
      </AppRoute>
      <AppRoute breadcrumb='My Listings' path={OTCMarketRoute.myListings}>
        <MyListings />
      </AppRoute>
      <AppRoute breadcrumb='Buyer List' path={OTCMarketRoute.buyerList}>
        <BuyerList />
      </AppRoute>
      <AppRoute path={OTCMarketRoute.landing}>
        <LandingPage title='OTC Market' links={OTCMarketLandingLinks} />
      </AppRoute>
    </Switch>
  )
}
