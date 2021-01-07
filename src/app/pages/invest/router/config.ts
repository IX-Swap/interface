import { makeURL } from 'config/appURL'

export const InvestRoute = {
  landing: makeURL(['app', 'invest']),
  dso: makeURL(['app', 'invest', 'offerings', 'issuerId', 'dsoId']),
  commitments: makeURL(['app', 'invest', 'commitments'])
}

export const DSORoute = {
  view: makeURL(['app', 'invest', 'offerings', 'issuerId', 'dsoId', 'view']),
  makeInvestment: makeURL([
    'app',
    'invest',
    'offerings',
    'issuerId',
    'dsoId',
    'makeInvestment'
  ])
}

export const CommitmentRoute = {
  list: makeURL(['app', 'invest', 'commitments']),
  view: makeURL(['app', 'invest', 'commitments', 'commitmentId', 'view'])
}
