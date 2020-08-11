import { InternalRouteProps } from '../../../../types/util'

import Balances from './pages/balances'
import Banks from './pages/banks'
import DigitalSecurities from './pages/digital-securities'
import Transactions from './pages/transactions'

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
