import { makeURL } from 'config/appURL'

export const AppRoute = {
  authorizer: makeURL(['app', 'authorizer']),
  identity: makeURL(['app', 'identity']),
  accounts: makeURL(['app', 'account']),
  issuance: makeURL(['app', 'issuance']),
  invest: makeURL(['app', 'invest']),
  admin: makeURL(['app', 'admin']),
  OTCMarket: makeURL(['app', 'OTCMarket']),
  security: makeURL(['app', 'settings']),
  notifications: makeURL(['app', 'notifications']),
  educationCentre: '/app/education-centre',
  fundsManagement: '/app/funds-management'
}
