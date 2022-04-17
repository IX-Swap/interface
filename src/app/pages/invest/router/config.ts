import { makeURL } from 'config/appURL'

export const InvestRoute = {
  landing: makeURL(['app', 'invest']),
  exchange: '/app/invest/exchange/:pairId',
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
  commitments: makeURL(['app', 'invest', 'commitments'])
}

export const CommitmentRoute = {
  list: makeURL(['app', 'invest', 'commitments']),
  view: makeURL(['app', 'invest', 'commitments', 'commitmentId', 'view'])
}
