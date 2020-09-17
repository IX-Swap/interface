import { InternalRouteProps } from 'v2/types/util'

import { Balances } from 'v2/app/pages/accounts/pages/balances/Balances'
import { Banks } from 'v2/app/pages/accounts/pages/banks/Banks'
import { DigitalSecurities } from 'v2/app/pages/accounts/pages/digitalSecurities/DigitalSecurities'
import Transactions from 'v2/app/pages/accounts/pages/transactions'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'

const AccountsRoute = {
  banks: '/app/accounts/banks',
  balances: '/app/accounts/balances',
  digitalSecurities: '/app/accounts/digital-securities',
  transactions: '/app/accounts/transactions'
}

const accountRoutes: InternalRouteProps[] = [
  {
    label: 'Asset Balance',
    path: AccountsRoute.balances,
    exact: true,
    component: Balances
  },
  {
    label: 'Bank Accounts',
    path: AccountsRoute.banks,
    component: Banks
  },
  {
    label: 'Digital Securities',
    path: AccountsRoute.digitalSecurities,
    component: DigitalSecurities
  },
  {
    label: 'Transactions',
    path: AccountsRoute.transactions,
    component: Transactions
  }
]

export const useAccountsRouter = generateAppRouterHook<typeof AccountsRoute>(
  AccountsRoute,
  AccountsRoute.balances,
  accountRoutes
)
