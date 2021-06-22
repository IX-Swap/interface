import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'

export const InvestRoute = {
  landing: makeURL(['app', 'invest']),
  view: makeURL(['app', 'invest', 'offerings', 'issuerId', 'dsoId', 'view']),
  makeInvestment: makeURL([
    'app',
    'invest',
    'offerings',
    'issuerId',
    'dsoId',
    'view',
    'makeInvestment'
  ]),
  commitments: makeURL(['app', 'invest', 'commitments'])
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
