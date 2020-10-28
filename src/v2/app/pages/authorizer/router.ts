import { DSWithdrawals } from 'v2/app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'
import { IndividualIdentities } from 'v2/app/pages/authorizer/pages/individualIdentities/IndividualIdentities'
import { CorporateIdentities } from 'v2/app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'
import { Offerings } from 'v2/app/pages/authorizer/pages/offerings/Offerings'
import { Commitments } from 'v2/app/pages/authorizer/pages/commitments/Commitments'
import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { ReactComponent as AccountIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as CashDepositIcon } from 'assets/icons/navigation/cash-deposit.svg'
import { ReactComponent as CashWithdrawalIcon } from 'assets/icons/navigation/cash-withdrawal.svg'
import { ReactComponent as DSWithdrawalIcon } from 'assets/icons/navigation/ds-withdrawal.svg'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as OfferingIcon } from 'assets/icons/navigation/offering.svg'
import { ReactComponent as CommitmentIcon } from 'assets/icons/navigation/commitment.svg'
import { makeURL } from 'v2/config/urls'
import { AuthorizerBanksRouterRoot } from 'v2/app/pages/authorizer/pages/banks/router'
import { AuthorizerCashDepositsRouterRoot } from 'v2/app/pages/authorizer/pages/cashDeposits/router'
import { AuthorizerCashWithdrawalsRouterRoot } from 'v2/app/pages/authorizer/pages/cashWithdrawals/router'
import { AuthorizerCommitmentsRouterRoot } from 'v2/app/pages/authorizer/pages/commitments/router'
import { AuthorizerCorporateIdentitiesRouterRoot } from 'v2/app/pages/authorizer/pages/corporateIdentities/router'
import { AuthorizerDSWithdrawalsRouterRoot } from 'v2/app/pages/authorizer/pages/dsWithdrawals/router'
import { AuthorizerIndividualIdentitiesRouterRoot } from 'v2/app/pages/authorizer/pages/individualIdentities/router'
import { AuthorizerOfferingsRouterRoot } from 'v2/app/pages/authorizer/pages/offerings/router'

export const AuthorizerRoute = {
  banks: makeURL(['app', 'authorizer', 'bankAccount']),
  landing: makeURL(['app', 'authorizer']),
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
    label: 'Bank Accounts',
    path: AuthorizerRoute.banks,
    component: AuthorizerBanksRouterRoot,
    color: '#2B78FD',
    icon: AccountIcon
  },
  {
    label: 'Cash Deposits',
    path: AuthorizerRoute.cashDeposits,
    component: AuthorizerCashDepositsRouterRoot,
    color: '#43B526',
    icon: CashDepositIcon
  },
  {
    label: 'Cash Withdrawals',
    path: AuthorizerRoute.cashWithdrawals,
    component: AuthorizerCashWithdrawalsRouterRoot,
    color: '#E6D200',
    icon: CashWithdrawalIcon
  },
  {
    label: 'Digital Securities Withdrawals',
    path: AuthorizerRoute.dsWithdrawals,
    component: AuthorizerDSWithdrawalsRouterRoot,
    color: '#8B3DFF',
    icon: DSWithdrawalIcon
  },
  {
    label: 'Individual Identities',
    path: AuthorizerRoute.individualIdentities,
    component: AuthorizerIndividualIdentitiesRouterRoot,
    color: '#90A30F',
    icon: IndividualIcon
  },
  {
    label: 'Corporate Identities',
    path: AuthorizerRoute.corporateIdentities,
    component: AuthorizerCorporateIdentitiesRouterRoot,
    color: '#E65133',
    icon: CorporateIcon
  },
  {
    label: 'Offerings',
    path: AuthorizerRoute.offerings,
    component: AuthorizerOfferingsRouterRoot,
    color: '#11BB93',
    icon: OfferingIcon
  },
  {
    label: 'Commitments',
    path: AuthorizerRoute.commitments,
    component: AuthorizerCommitmentsRouterRoot,
    color: '#C17F53',
    icon: CommitmentIcon
  },
  {
    label: 'Authorization',
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
