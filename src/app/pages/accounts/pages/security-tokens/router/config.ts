import { makeURL } from 'config/appURL'

export const DSRoute = {
  list: makeURL(['app', 'accounts', 'digitalSecurity']),
  deposit: makeURL(['app', 'accounts', 'digitalSecurity', 'deposit']),
  withdraw: makeURL(['app', 'accounts', 'digitalSecurity', 'withdraw'])
}
