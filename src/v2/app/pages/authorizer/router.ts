import { Banks } from 'v2/app/pages/authorizer/pages/banks/Banks'
import { CashDeposits } from 'v2/app/pages/authorizer/pages/cash-deposits/CashDeposits'
import { CashWithdrawals } from 'v2/app/pages/authorizer/pages/cash-withdrawals/CashWithdrawals'
import { DSWithdrawals } from 'v2/app/pages/authorizer/pages/ds-withdrawals/DSWithdrawals'
import { IndividualIdentities } from 'v2/app/pages/authorizer/pages/individual-identities/IndividualIdentities'
import { CorporateIdentities } from 'v2/app/pages/authorizer/pages/corporate-identities/CorporateIdentities'
import { Offerings } from 'v2/app/pages/authorizer/pages/offerings/Offerings'
import { Commitments } from 'v2/app/pages/authorizer/pages/commitments/Commitments'
import { Listings } from 'v2/app/pages/authorizer/pages/listings/Listings'

import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'

const AuthorizerRoute = {
  banks: '/app/authorizer/banks',
  deposits: '/app/authorizer/deposits',
  withdrawals: '/app/authorizer/withdrawals',
  dsWithdrawals: '/app/authorizer/ds-withdrawals',
  individualIdentities: '/app/authorizer/individual-identities',
  corporateIdentities: '/app/authorizer/corporate-identities',
  offerings: '/app/authorizer/offerings',
  commitments: '/app/authorizer/commitments',
  listings: '/app/authorizer/listings'
}

const authorizerRoutes: InternalRouteProps[] = [
  {
    label: 'Bank Accounts',
    path: AuthorizerRoute.banks,
    component: Banks
  },
  {
    label: 'Cash Deposits',
    path: AuthorizerRoute.deposits,
    component: CashDeposits
  },
  {
    label: 'Cash Withdrawals',
    path: AuthorizerRoute.withdrawals,
    component: CashWithdrawals
  },
  {
    label: 'DS Withdrawals',
    path: AuthorizerRoute.dsWithdrawals,
    component: DSWithdrawals
  },
  {
    label: 'Individual Identities',
    path: AuthorizerRoute.individualIdentities,
    component: IndividualIdentities
  },
  {
    label: 'Corporate Identities',
    path: AuthorizerRoute.corporateIdentities,
    component: CorporateIdentities
  },
  {
    label: 'Offerings',
    path: AuthorizerRoute.offerings,
    component: Offerings
  },
  {
    label: 'Commitments',
    path: AuthorizerRoute.commitments,
    exact: true,
    component: Commitments
  },
  {
    label: 'Listings',
    path: AuthorizerRoute.listings,
    component: Listings
  }
]

export const useAuthorizerRouter = generateAppRouterHook<
  typeof AuthorizerRoute
>(AuthorizerRoute, AuthorizerRoute.banks, authorizerRoutes)
