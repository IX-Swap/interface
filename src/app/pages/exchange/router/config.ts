import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { ReactComponent as OTCMarketIcon } from 'assets/icons/navigation/otc-market.svg'
import { ReactComponent as ListingsIcon } from 'assets/icons/navigation/listings.svg'
import { ReactComponent as HoldingsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as BuyerListIcon } from 'assets/icons/navigation/buyer-list.svg'

export const OTCMarketRoute = {
  landing: makeURL(['app', 'OTCMarket']),
  market: makeURL(['app', 'OTCMarket', 'market']),
  holdings: makeURL(['app', 'OTCMarket', 'holdings']),
  myListings: makeURL(['app', 'OTCMarket', 'myListings']),
  myListing: makeURL(['app', 'OTCMarket', 'myListings', 'listingId']),
  buyerList: makeURL(['app', 'OTCMarket', 'buyerList'])
}

export const OTCMarketLandingLinks: InternalRouteProps[] = [
  {
    label: 'Market',
    path: OTCMarketRoute.market,
    color: '#E65133',
    icon: OTCMarketIcon
  },
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
