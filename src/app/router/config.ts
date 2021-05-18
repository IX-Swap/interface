import { makeURL } from 'config/appURL'

export const AppRoute = {
  authorizer: makeURL(['app', 'authorizer']),
  identity: makeURL(['app', 'identity']),
  accounts: makeURL(['app', 'account']),
  issuance: makeURL(['app', 'issuance']),
  invest: makeURL(['app', 'invest']),
  admin: makeURL(['app', 'admin']),
  security: makeURL(['app', 'settings']),
  notifications: makeURL(['app', 'notifications']),
  home: makeURL(['app', 'home']),
  market: makeURL(['app', 'market'])
}
