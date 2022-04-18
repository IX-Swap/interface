import React from 'react'
import { Switch } from 'react-router-dom'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { AppRoute } from 'components/AppRoute'
import { BuyerList } from '../pages/buyer-list/BuyerList'
import { MyListingsRouter } from 'app/pages/exchange/router/MyListingsRouter'
import { CreateListing } from 'app/pages/exchange/pages/create-listing/CreateListing'

export const OTCMarketRouter = () => {
  return (
    <Switch>
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
    </Switch>
  )
}
