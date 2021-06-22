import { makeURL } from 'config/appURL'

export const DSRoute = {
  list: makeURL(['app', 'account', 'digitalSecurity']),
  deposit: makeURL([
    'app',
    'account',
    'digitalSecurity',
    'balanceId',
    'deposit'
  ]),
  withdraw: makeURL([
    'app',
    'account',
    'digitalSecurity',
    'balanceId',
    'withdraw'
  ])
}
