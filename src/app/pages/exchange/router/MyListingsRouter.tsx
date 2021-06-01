import { Switch } from 'react-router-dom'
import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { MyListings } from 'app/pages/exchange/pages/my-listings/MyListings'
import { ViewListing } from 'app/pages/exchange/pages/my-listings/ViewListing'
import { CreateListing } from '../pages/create-listing/CreateListing'

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
      <AppRoute
        breadcrumb='Create Listing'
        exact
        path={OTCMarketRoute.createListing}
      >
        <CreateListing />
      </AppRoute>
      <AppRoute breadcrumb='My Listings' path={OTCMarketRoute.myListings}>
        <MyListings />
      </AppRoute>
    </Switch>
  )
}
