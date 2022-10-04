import { EditListing } from 'app/pages/issuance/pages/SecondaryListings/EditListing'
import { SecondaryListings } from 'app/pages/issuance/pages/SecondaryListings/SecondaryListings'
import { ViewListing } from 'app/pages/issuance/pages/SecondaryListings/ViewListing'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch, useLocation } from 'react-router-dom'

export const MyListingsRouter = () => {
  const { pathname } = useLocation()
  const extractPathname = pathname.split('/')
  const pathnameLength = extractPathname.slice(
    extractPathname.indexOf('secondary-listings') + 1,
    -1
  ).length

  return (
    <Switch>
      <AppRoute exact path={IssuanceRoute.secondaryListings}>
        <SecondaryListings />
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

      <AppRoute
        breadcrumb='Edit Listing'
        path={
          pathnameLength > 1
            ? IssuanceRoute.editOTCListing
            : IssuanceRoute.editListing
        }
      >
        <EditListing />
      </AppRoute>
    </Switch>
  )
}
