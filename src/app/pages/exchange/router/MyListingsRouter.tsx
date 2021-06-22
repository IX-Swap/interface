import { Switch } from 'react-router-dom'
import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { MyListings } from 'app/pages/exchange/pages/my-listings/MyListings'
import { ViewListing } from 'app/pages/exchange/pages/my-listings/ViewListing'
import { CreateListing } from '../pages/create-listing/CreateListing'
import { EditListing } from 'app/pages/exchange/pages/edit-listing/EditListing'

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
        breadcrumb='Preview Listing'
        exact
        path={OTCMarketRoute.previewListing}
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
      <AppRoute
        breadcrumb='Edit Listing'
        exact
        path={OTCMarketRoute.editListing}
      >
        <EditListing />
      </AppRoute>
      <AppRoute breadcrumb='My Listings' path={OTCMarketRoute.myListings}>
        <MyListings />
      </AppRoute>
    </Switch>
  )
}
