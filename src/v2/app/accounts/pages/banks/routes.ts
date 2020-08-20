import { InternalRouteProps } from 'v2/types/util'

import BankList from 'v2/app/accounts/pages/banks/pages/list'
import BankPreview from 'v2/app/accounts/pages/banks/pages/view'
import BankDeposit from 'v2/app/accounts/pages/banks/pages/deposit'
import BankWithdraw from 'v2/app/accounts/pages/banks/pages/withdraw'
import BankCreate from 'v2/app/accounts/pages/banks/pages/create'
import BankEdit from 'v2/app/accounts/pages/banks/pages/edit'

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
