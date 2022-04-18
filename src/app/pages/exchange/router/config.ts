import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { ReactComponent as ListingsIcon } from 'assets/icons/navigation/listings.svg'
import { ReactComponent as BuyerListIcon } from 'assets/icons/navigation/buyer-list.svg'

export const OTCMarketRoute = {
  viewListing: makeURL(['app', 'OTCMarket', 'myListings', 'listingId', 'view']),
  editListing: makeURL(['app', 'OTCMarket', 'myListings', 'listingId', 'edit']),
  myListings: makeURL(['app', 'OTCMarket', 'myListings']),
  createListing: makeURL(['app', 'OTCMarket', 'myListings', 'create']),
  previewListing: makeURL([
    'app',
    'OTCMarket',
    'myListings',
    'issuerId',
    'listingId',
    'preview'
  ]),
  buyerList: makeURL(['app', 'OTCMarket', 'buyerList'])
}

export const OTCMarketLandingLinks: InternalRouteProps[] = [
  {
    label: 'My Listings',
    path: OTCMarketRoute.myListings,
    color: '#90A30F',
    icon: ListingsIcon
  },
  {
    label: 'Buyer List',
    path: OTCMarketRoute.buyerList,
    color: '#11BB93',
    icon: BuyerListIcon
  }
]
