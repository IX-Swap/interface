import { makeURL } from 'config/appURL'

export const WithdrawalAddressesRoute = {
  list: makeURL(['app', 'accounts', 'withdrawalAddresses']),
  view: makeURL([
    'app',
    'accounts',
    'withdrawalAddresses',
    'withdrawalAddressId',
    'view'
  ]),
  create: makeURL(['app', 'accounts', 'withdrawalAddresses', 'create'])
}
