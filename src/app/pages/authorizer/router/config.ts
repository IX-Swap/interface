import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { ReactComponent as AccountIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as CashWithdrawalIcon } from 'assets/icons/navigation/cash-withdrawal.svg'
import { ReactComponent as STWithdrawalIcon } from 'assets/icons/navigation/st-withdrawal.svg'
import { ReactComponent as WithdrawalAddressIcon } from 'assets/icons/navigation/withdrawal-address.svg'
// import { ReactComponent as IssuanceDetailsIcon } from 'assets/icons/navigation/issuance-details.svg'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as OfferingIcon } from 'assets/icons/navigation/offering.svg'
import { ReactComponent as TransactionIcon } from 'assets/icons/navigation/va-transactions.svg'
import { ReactComponent as CommitmentIcon } from 'assets/icons/navigation/commitment.svg'
import { ReactComponent as ListingsIcon } from 'assets/icons/navigation/listings.svg'
import { ReactComponent as VirtualAccountIcon } from 'assets/icons/navigation/virtual-account.svg'
import { ReactComponent as TokenDeploymentIcon } from 'assets/icons/navigation/token-deployment.svg'

export const AuthorizerRoute = {
  banks: makeURL(['app', 'authorizer', 'bankAccount']),
  landing: makeURL(['app', 'authorizer']),
  cashWithdrawals: makeURL(['app', 'authorizer', 'cashWithdrawal']),
  dsWithdrawals: makeURL(['app', 'authorizer', 'dsWithdrawal']),
  individualIdentities: makeURL(['app', 'authorizer', 'individualIdentity']),
  individualAccreditations: makeURL([
    'app',
    'authorizer',
    'individualAccreditation'
  ]),
  corporateIdentities: makeURL(['app', 'authorizer', 'corporateIdentity']),
  editCorporateIdentity: '/app/authorizer/corporates/:userId/:identityId/edit',
  corporateAccreditations: makeURL([
    'app',
    'authorizer',
    'corporateAccreditation'
  ]),
  editCorporateAccreditation:
    '/app/authorizer/corporates/accreditation/:userId/:identityId/edit',
  offerings: makeURL(['app', 'authorizer', 'offerings']),
  commitments: makeURL(['app', 'authorizer', 'commitments']),
  withdrawalAddresses: makeURL(['app', 'authorizer', 'withdrawalAddresses']),
  viewItem: makeURL(['app', 'authorizer', 'category', 'itemId']),
  issuanceDetails: makeURL(['app', 'authorizer', 'issuanceDetails']),
  listings: '/app/authorizer/listings',
  virtualAccounts: '/app/authorizer/virtual-accounts',
  dealClosure: '/app/authorizer/closure',
  tokenDeployment: '/app/authorizer/token-deployment',
  otcTrades: '/app/authorizer/otc-trades'
}

export const authorizerLandingLinks: InternalRouteProps[] = [
  {
    label: 'Cash Accounts',
    path: AuthorizerRoute.banks,
    icon: AccountIcon
  },
  {
    label: 'Cash Withdrawals',
    path: AuthorizerRoute.cashWithdrawals,
    icon: CashWithdrawalIcon
  },
  {
    label: 'Security Token Withdrawals',
    path: AuthorizerRoute.dsWithdrawals,
    icon: STWithdrawalIcon
  },
  {
    label: 'Individual Investor Applications',
    path: AuthorizerRoute.individualIdentities,
    icon: IndividualIcon
  },
  //   {
  //     label: 'Individual Accreditation Applications',
  //     path: AuthorizerRoute.individualAccreditations,
  //     icon: IndividualIcon
  //   },
  {
    label: 'Corporate Investor Applications',
    path: AuthorizerRoute.corporateIdentities,
    icon: CorporateIcon
  },
  //   {
  //     label: 'Corporate Accreditation Applications',
  //     path: AuthorizerRoute.corporateAccreditations,
  //     icon: CorporateIcon
  //   },
  {
    label: 'Issuance Offerings',
    path: AuthorizerRoute.offerings,
    icon: OfferingIcon
  },
  // {
  //   label: 'Deal Closure',
  //   path: AuthorizerRoute.dealClosure,
  //   icon: CommitmentIcon
  // },
  {
    label: 'OTC Trades',
    path: AuthorizerRoute.otcTrades,
    icon: TransactionIcon
  },
  {
    label: 'Commitments',
    path: AuthorizerRoute.commitments,
    icon: CommitmentIcon
  },
  {
    label: 'Wallet Addresses',
    path: AuthorizerRoute.withdrawalAddresses,
    icon: WithdrawalAddressIcon
  },
  // {
  //   label: 'Proposed Fundraising Details',
  //   path: AuthorizerRoute.issuanceDetails,
  //   icon: IssuanceDetailsIcon
  // },
  {
    label: 'Listings',
    path: AuthorizerRoute.listings,
    icon: ListingsIcon
  },
  {
    label: 'Virtual Accounts',
    path: AuthorizerRoute.virtualAccounts,
    icon: VirtualAccountIcon
  },
  {
    label: 'Token Deployment',
    path: AuthorizerRoute.tokenDeployment,
    icon: TokenDeploymentIcon
  }
]
