import { Switch } from 'react-router-dom'
import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { MyListings } from 'app/pages/issuance/pages/MyListings/MyListings'
import { ViewListing } from 'app/pages/issuance/pages/MyListings/ViewListing'
import { EditListing } from 'app/pages/issuance/pages/MyListings/EditListing'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const MyListingsRouter = () => {
  return (
    <Switch>
      <AppRoute exact path={IssuanceRoute.myListings}>
        <MyListings />
      </AppRoute>

      <AppRoute breadcrumb='View Listing' path={IssuanceRoute.viewListing}>
        <ViewListing />
      </AppRoute>

      <AppRoute
        breadcrumb='Preview Listing'
        path={IssuanceRoute.previewListing}
      >
        <ViewListing />
      </AppRoute>

      <AppRoute breadcrumb='Edit Listing' path={IssuanceRoute.editListing}>
        <EditListing />
      </AppRoute>
    </Switch>
  )
}
