import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { ReactComponent as ListingsIcon } from 'assets/icons/navigation/listings.svg'
import { ReactComponent as HoldingsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as BuyerListIcon } from 'assets/icons/navigation/buyer-list.svg'

export const OTCMarketRoute = {
  holdings: makeURL(['app', 'OTCMarket', 'holdings']),
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
    label: 'Holdings',
    path: OTCMarketRoute.holdings,
    color: '#2B78FD',
    icon: HoldingsIcon
  },
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
