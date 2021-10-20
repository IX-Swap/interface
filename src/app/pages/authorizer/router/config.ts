import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { ReactComponent as AccountIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as CashWithdrawalIcon } from 'assets/icons/navigation/cash-withdrawal.svg'
import { ReactComponent as DSWithdrawalIcon } from 'assets/icons/navigation/ds-withdrawal.svg'
import { ReactComponent as WithdrawalAddressIcon } from 'assets/icons/navigation/withdrawal-address.svg'
import { ReactComponent as IssuanceDetailsIcon } from 'assets/icons/navigation/issuance-details.svg'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as CorporateIcon } from 'assets/icons/navigation/corporate.svg'
import { ReactComponent as OfferingIcon } from 'assets/icons/navigation/offering.svg'
import { ReactComponent as CommitmentIcon } from 'assets/icons/navigation/commitment.svg'
import { ReactComponent as ListingsIcon } from 'assets/icons/navigation/listings.svg'
import { ReactComponent as VirtualAccountIcon } from 'assets/icons/navigation/virtual-account.svg'

export const AuthorizerRoute = {
  banks: makeURL(['app', 'authorizer', 'bankAccount']),
  landing: makeURL(['app', 'authorizer']),
  cashWithdrawals: makeURL(['app', 'authorizer', 'cashWithdrawal']),
  dsWithdrawals: makeURL(['app', 'authorizer', 'dsWithdrawal']),
  individualIdentities: makeURL(['app', 'authorizer', 'individualIdentity']),
  corporateIdentities: makeURL(['app', 'authorizer', 'corporateIdentity']),
  offerings: makeURL(['app', 'authorizer', 'offerings']),
  commitments: makeURL(['app', 'authorizer', 'commitments']),
  withdrawalAddresses: makeURL(['app', 'authorizer', 'withdrawalAddresses']),
  viewItem: makeURL(['app', 'authorizer', 'category', 'itemId']),
  issuanceDetails: makeURL(['app', 'authorizer', 'issuanceDetails']),
  listings: '/app/authorizer/listings',
  virtualAccounts: '/app/authorizer/virtual-accounts',
  dealClosure: '/app/authorizer/closure',
  tokenDeployment: '/app/authorizer/token-deployment'
}

export const authorizerLandingLinks: InternalRouteProps[] = [
  {
    label: 'Bank Accounts',
    path: AuthorizerRoute.banks,
    color: '#2B78FD',
    icon: AccountIcon
  },
  {
    label: 'Cash Withdrawals',
    path: AuthorizerRoute.cashWithdrawals,
    color: '#E6D200',
    icon: CashWithdrawalIcon
  },
  {
    label: 'Digital Security Withdrawals',
    path: AuthorizerRoute.dsWithdrawals,
    color: '#8B3DFF',
    icon: DSWithdrawalIcon
  },
  {
    label: 'Individual Identities',
    path: AuthorizerRoute.individualIdentities,
    color: '#90A30F',
    icon: IndividualIcon
  },
  {
    label: 'Corporate Identities',
    path: AuthorizerRoute.corporateIdentities,
    color: '#E65133',
    icon: CorporateIcon
  },
  {
    label: 'Issuance Offerings',
    path: AuthorizerRoute.offerings,
    color: '#11BB93',
    icon: OfferingIcon
  },
  {
    label: 'Deal Closure',
    path: AuthorizerRoute.dealClosure,
    color: '#11BB93',
    icon: CommitmentIcon
  },
  {
    label: 'Commitments',
    path: AuthorizerRoute.commitments,
    color: '#C17F53',
    icon: CommitmentIcon
  },
  {
    label: 'Withdrawal Addresses',
    path: AuthorizerRoute.withdrawalAddresses,
    color: '#e6d200',
    icon: WithdrawalAddressIcon
  },
  {
    label: 'Proposed Fundraising Details',
    path: AuthorizerRoute.issuanceDetails,
    color: '#11BB93',
    icon: IssuanceDetailsIcon
  },
  {
    label: 'Listings',
    path: AuthorizerRoute.listings,
    color: '#90A30F',
    icon: ListingsIcon
  },
  {
    label: 'Virtual Accounts',
    path: AuthorizerRoute.virtualAccounts,
    color: '#0FA3A3',
    icon: VirtualAccountIcon
  },
  {
    label: 'Token Deployment',
    path: AuthorizerRoute.tokenDeployment,
    color: '#0FA3A3',
    icon: VirtualAccountIcon
  }
]
