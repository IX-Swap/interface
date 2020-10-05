import { Banks } from 'v2/app/pages/authorizer/pages/banks/Banks'
import { CashDeposits } from 'v2/app/pages/authorizer/pages/cashDeposits/CashDeposits'
import { CashWithdrawals } from 'v2/app/pages/authorizer/pages/cashWithdrawals/CashWithdrawals'
import { DSWithdrawals } from 'v2/app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'
import { IndividualIdentities } from 'v2/app/pages/authorizer/pages/individualIdentities/IndividualIdentities'
import { CorporateIdentities } from 'v2/app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'
import { Offerings } from 'v2/app/pages/authorizer/pages/offerings/Offerings'
import { Commitments } from 'v2/app/pages/authorizer/pages/commitments/Commitments'
import { Listings } from 'v2/app/pages/authorizer/pages/listings/Listings'
import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { ViewAuthorizableItem } from './components/ViewAuthorizableItem'

const AuthorizerRoute = {
  viewItem: '/app/authorizer/:category/:itemId',
  banks: '/app/authorizer/banks',
  deposits: '/app/authorizer/deposits',
  withdrawals: '/app/authorizer/withdrawals',
  dsWithdrawals: '/app/authorizer/dsWithdrawals',
  individualIdentities: '/app/authorizer/individualIdentities',
  corporateIdentities: '/app/authorizer/corporateIdentities',
  offerings: '/app/authorizer/offerings',
  commitments: '/app/authorizer/commitments',
  listings: '/app/authorizer/listings'
}

const authorizerRoutes: InternalRouteProps[] = [
  {
    label: 'View Item',
    path: AuthorizerRoute.viewItem,
    component: ViewAuthorizableItem,
    exact: true
  },
  {
    label: 'Bank Accounts',
    path: AuthorizerRoute.banks,
    component: Banks,
    exact: true
  },
  {
    label: 'Cash Deposits',
    path: AuthorizerRoute.deposits,
    component: CashDeposits,
    exact: true
  },
  {
    label: 'Cash Withdrawals',
    path: AuthorizerRoute.withdrawals,
    component: CashWithdrawals,
    exact: true
  },
  {
    label: 'DS Withdrawals',
    path: AuthorizerRoute.dsWithdrawals,
    component: DSWithdrawals,
    exact: true
  },
  {
    label: 'Individual Identities',
    path: AuthorizerRoute.individualIdentities,
    component: IndividualIdentities,
    exact: true
  },
  {
    label: 'Corporate Identities',
    path: AuthorizerRoute.corporateIdentities,
    component: CorporateIdentities,
    exact: true
  },
  {
    label: 'Offerings',
    path: AuthorizerRoute.offerings,
    component: Offerings,
    exact: true
  },
  {
    label: 'Commitments',
    path: AuthorizerRoute.commitments,
    component: Commitments,
    exact: true
  },
  {
    label: 'Listings',
    path: AuthorizerRoute.listings,
    component: Listings,
    exact: true
  }
]

export const useAuthorizerRouter = generateAppRouterHook(
  AuthorizerRoute,
  AuthorizerRoute.banks,
  authorizerRoutes
)
