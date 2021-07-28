import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { AppRoute } from 'components/AppRoute'
import { Market } from '../pages/market/Market'
import { BuyerList } from '../pages/buyer-list/BuyerList'
import { MyHoldings } from 'app/pages/exchange/pages/holdings/MyHoldings'
import { MyListingsRouter } from 'app/pages/exchange/router/MyListingsRouter'
import { CreateListing } from 'app/pages/exchange/pages/create-listing/CreateListing'

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
      <AppRoute
        breadcrumb='Create a New Listing'
        exact
        path={OTCMarketRoute.createListing}
      >
        <CreateListing />
      </AppRoute>
      <AppRoute breadcrumb='Buyer List' exact path={OTCMarketRoute.buyerList}>
        <BuyerList />
      </AppRoute>
      <AppRoute path={OTCMarketRoute.landing}>
        <Redirect to={OTCMarketRoute.market} />
      </AppRoute>
    </Switch>
  )
}
