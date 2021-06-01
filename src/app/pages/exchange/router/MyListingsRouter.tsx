import { Switch } from 'react-router-dom'
import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { MyListings } from 'app/pages/exchange/pages/my-listings/MyListings'
import { ViewListing } from 'app/pages/exchange/pages/my-listings/ViewListing'

export const MyListingsRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='View Listing'
        exact
        path={OTCMarketRoute.viewListing}
      >
        <ViewListing />
      </AppRoute>
      <AppRoute breadcrumb='My Listings' path={OTCMarketRoute.myListings}>
        <MyListings />
      </AppRoute>
    </Switch>
  )
}
