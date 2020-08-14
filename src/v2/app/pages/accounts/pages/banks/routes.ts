import { InternalRouteProps } from '../../../../../types/util'

import BankList from './pages/list'
import BankPreview from './pages/view'
import BankDeposit from './pages/deposit'
import BankWithdraw from './pages/withdraw'
import BankCreate from './pages/create'
import BankEdit from './pages/edit'

const routes: InternalRouteProps[] = [
  {
    label: 'List',
    path: '/',
    exact: true,
    component: BankList
  },
  {
    label: 'View Bank',
    path: '/view',
    component: BankPreview
  },
  {
    label: 'Deposit',
    path: '/deposit',
    component: BankDeposit
  },
  {
    label: 'Withdraw',
    path: '/withdraw',
    component: BankWithdraw
  },
  {
    label: 'Add Bank Account',
    path: '/create',
    component: BankCreate
  },
  {
    label: 'Edit Bank Account',
    path: '/edit',
    component: BankEdit
  }
]

export default routes
