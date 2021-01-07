import { makeURL } from 'config/appURL'

export const WithdrawalAddressesRoute = {
  list: makeURL(['app', 'account', 'withdrawalAddresses']),
  view: makeURL([
    'app',
    'account',
    'withdrawalAddresses',
    'withdrawalAddressId',
    'view'
  ]),
  create: makeURL(['app', 'account', 'withdrawalAddresses', 'create'])
}
