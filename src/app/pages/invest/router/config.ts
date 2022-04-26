import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'

export const InvestRoute = {
  landing: makeURL(['app', 'invest']),
  overview: makeURL(['app', 'invest', 'overview']),
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
  trading: makeURL(['app', 'invest', 'trading'])
}

export const CommitmentRoute = {
  list: makeURL(['app', 'invest', 'commitments']),
  view: makeURL(['app', 'invest', 'commitments', 'commitmentId', 'view'])
}

export const InvestLandingLinks: InternalRouteProps[] = [
  {
    label: 'Primary',
    path: InvestRoute.landing
  },
  {
    label: 'OTC Market',
    path: OTCMarketRoute.landing
  }
]
