import { InternalRouteProps } from 'v2/types/util'

import Balances from 'v2/app/accounts/pages/balances'
import Banks from 'v2/app/accounts/pages/banks'
import DigitalSecurities from 'v2/app/accounts/pages/digital-securities'
import Transactions from 'v2/app/accounts/pages/transactions'

const routes: InternalRouteProps[] = [
  {
    label: 'Asset Balance',
    path: '/balances',
    exact: true,
    component: Balances
  },
  {
    label: 'Bank Accounts',
    path: '/banks',
    component: Banks
  },
  {
    label: 'Digital Securities',
    path: '/digital-securites',
    component: DigitalSecurities
  },
  {
    label: 'Transactions',
    path: '/transactions',
    component: Transactions
  }
]

export default routes
