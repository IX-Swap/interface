import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'

export const InvestRoute = {
  landing: makeURL(['app', 'invest']),
  exchange: '/app/invest/exchange/:pairId',
  overview: '/app/invest/overview',
  primaryOfferings: '/app/invest/overview/primary-offerings',
  view: makeURL(['app', 'invest', 'offerings', 'issuerId', 'dsoId', 'view']),
  viewListing: makeURL([
    'app',
    'invest',
    'listings',
    'userId',
    'listingId',
    'view'
  ]),
  makeInvestment: makeURL([
    'app',
    'invest',
    'offerings',
    'issuerId',
    'dsoId',
    'view',
    'makeInvestment'
  ]),
  commitments: makeURL(['app', 'invest', 'commitments']),
  trading: makeURL(['app', 'invest', 'trading', 'pairId']),
  tradingRoot: makeURL(['app', 'trading'])
}

export const CommitmentRoute = {
  list: makeURL(['app', 'invest', 'commitments']),
  view: makeURL(['app', 'invest', 'commitments', 'commitmentId', 'view'])
}

export const investLandingLinks: InternalRouteProps[] = [
  {
    label: 'Overview',
    path: InvestRoute.overview
  },
  {
    label: 'Primary',
    path: InvestRoute.primaryOfferings
  },
  {
    label: 'Trading',
    path: InvestRoute.trading
  },
  {
    label: 'IX Exchange',
    path: InvestRoute.exchange
  },
  {
    label: 'IX Swap',
    path: 'https://swap.investax.io/',
    external: true
  }
]
