import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router'
import { ListingAuthorization } from '../ListingAuthorization'
import { Listings } from '../Listings'

export const AuthorizerListingsRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Listing Details'
        path='/app/authorizer/listings/:userId/:listingId/view'
      >
        <ListingAuthorization />
      </AppRoute>
      <AppRoute exact path='/app/authorizer/listings'>
        <Listings />
      </AppRoute>
    </Switch>
  )
}
