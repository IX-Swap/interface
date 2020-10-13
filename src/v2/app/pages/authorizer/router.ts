import { Banks } from 'v2/app/pages/authorizer/pages/banks/Banks'
import { CashDeposits } from 'v2/app/pages/authorizer/pages/cashDeposits/CashDeposits'
import { CashWithdrawals } from 'v2/app/pages/authorizer/pages/cashWithdrawals/CashWithdrawals'
import { DSWithdrawals } from 'v2/app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'
import { IndividualIdentities } from 'v2/app/pages/authorizer/pages/individualIdentities/IndividualIdentities'
import { CorporateIdentities } from 'v2/app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'
import { Offerings } from 'v2/app/pages/authorizer/pages/offerings/Offerings'
import { Commitments } from 'v2/app/pages/authorizer/pages/commitments/Commitments'
import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { ViewAuthorizableItem } from './components/ViewAuthorizableItem'
import { ReactComponent as AccountIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as CashDepositIcon } from 'assets/icons/navigation/cash-deposit.svg'
import { ReactComponent as CashWithdrawalIcon } from 'assets/icons/navigation/cash-withdrawal.svg'
import { ReactComponent as DSWithdrawalIcon } from 'assets/icons/navigation/ds-withdrawal.svg'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as OfferingIcon } from 'assets/icons/navigation/offering.svg'
import { ReactComponent as CommitmentIcon } from 'assets/icons/navigation/commitment.svg'
import { makeURL } from 'v2/config/urls'

export const AuthorizerRoute = {
  landing: makeURL(['app', 'authorizer']),
  banks: makeURL(['app', 'authorizer', 'bankAccount']),
  cashDeposits: makeURL(['app', 'authorizer', 'cashDeposit']),
  cashWithdrawals: makeURL(['app', 'authorizer', 'cashWithdrawal']),
  dsWithdrawals: makeURL(['app', 'authorizer', 'dsWithdrawal']),
  individualIdentities: makeURL(['app', 'authorizer', 'individualIdentity']),
  corporateIdentities: makeURL(['app', 'authorizer', 'corporateIdentity']),
  offerings: makeURL(['app', 'authorizer', 'offerings']),
  commitments: makeURL(['app', 'authorizer', 'commitments']),
  viewItem: makeURL(['app', 'authorizer', 'category', 'itemId'])
}

export const authorizerRoutes: InternalRouteProps[] = [
  {
    label: 'View Item',
    path: AuthorizerRoute.viewItem,
    component: ViewAuthorizableItem,
    exact: true,
    generic: true
  },
  {
    label: 'Bank Accounts',
    path: AuthorizerRoute.banks,
    component: Banks,
    exact: true,
    color: '#2B78FD',
    icon: AccountIcon
  },
  {
    label: 'Cash Deposits',
    path: AuthorizerRoute.cashDeposits,
    component: CashDeposits,
    exact: true,
    color: '#43B526',
    icon: CashDepositIcon
  },
  {
    label: 'Cash Withdrawals',
    path: AuthorizerRoute.cashWithdrawals,
    component: CashWithdrawals,
    exact: true,
    color: '#E6D200',
    icon: CashWithdrawalIcon
  },
  {
    label: 'DS Withdrawals',
    path: AuthorizerRoute.dsWithdrawals,
    component: DSWithdrawals,
    exact: true,
    color: '#8B3DFF',
    icon: DSWithdrawalIcon
  },
  {
    label: 'Individual Identities',
    path: AuthorizerRoute.individualIdentities,
    component: IndividualIdentities,
    exact: true,
    color: '#90A30F',
    icon: IndividualIcon
  },
  {
    label: 'Corporate Identities',
    path: AuthorizerRoute.corporateIdentities,
    component: CorporateIdentities,
    exact: true,
    color: '#E65133',
    icon: CorporateIcon
  },
  {
    label: 'Offerings',
    path: AuthorizerRoute.offerings,
    component: Offerings,
    exact: true,
    color: '#11BB93',
    icon: OfferingIcon
  },
  {
    label: 'Commitments',
    path: AuthorizerRoute.commitments,
    component: Commitments,
    exact: true,
    color: '#C17F53',
    icon: CommitmentIcon
  },
  {
    label: 'Authorizer',
    path: AuthorizerRoute.landing,
    exact: true,
    root: true
  }
]

export const useAuthorizerRouter = generateAppRouterHook(
  AuthorizerRoute,
  AuthorizerRoute.landing,
  authorizerRoutes
)
