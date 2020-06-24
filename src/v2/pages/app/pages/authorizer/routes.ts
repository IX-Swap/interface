import BankAuthorizeModule from './banks'
import CashDepositsModule from './cash-deposits'
import CashWithdrawalsModule from './cash-withdrawals'
import DSWithdrawalsModule from './ds-withdrawals'
import IndividualIdentitiesModule from './individual-identities'
import CorporateIdentitiesModule from './corporate-identities'
import OfferingsModule from './offerings'
import CommitmentsModule from './commitments'
import ListingsModule from './listings'

import { InternalRouteProps } from '../../../../types/util'

const routes: InternalRouteProps[] = [
  {
    label: 'Bank Accounts',
    path: '/banks',
    component: BankAuthorizeModule
  },
  {
    label: 'Cash Deposits',
    path: '/deposits',
    component: CashDepositsModule
  },
  {
    label: 'Cash Withdrawals',
    path: '/withdrawals',
    component: CashWithdrawalsModule
  },
  {
    label: 'DS Withdrawals',
    path: '/ds-withdrawals',
    component: DSWithdrawalsModule
  },
  {
    label: 'Individual Identities',
    path: '/individual-identities',
    component: IndividualIdentitiesModule
  },
  {
    label: 'Corporate Identities',
    path: '/corporate-identities',
    component: CorporateIdentitiesModule
  },
  {
    label: 'Offerings',
    path: '/offerings',
    component: OfferingsModule
  },
  {
    label: 'Commitments',
    path: '/commitments',
    exact: true,
    component: CommitmentsModule
  },
  {
    label: 'Listings',
    path: '/listings',
    component: ListingsModule
  }
]

export default routes
