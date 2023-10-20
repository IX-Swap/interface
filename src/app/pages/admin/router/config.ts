import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as UsersIcon } from 'assets/icons/navigation/users.svg'
import { ReactComponent as VirtualAccountIcon } from 'assets/icons/navigation/virtual-account.svg'
import { ReactComponent as BannerIcon } from 'assets/icons/navigation/banner.svg'
import { ReactComponent as MasDisclosureIcon } from 'assets/icons/navigation/mas-disclosure.svg'
import { ReactComponent as VAAuditIcon } from 'assets/icons/navigation/va-audit.svg'
import { ReactComponent as VATransactionsIcon } from 'assets/icons/navigation/va-transactions.svg'
import { ReactComponent as WhitelistIcon } from 'assets/icons/navigation/whitelist-wallet-addresses.svg'
import { ReactComponent as TokenTransactionsIcon } from 'assets/icons/navigation/token-transactions.svg'
import { ReactComponent as CustodyManagementIcon } from 'assets/icons/navigation/custody-management.svg'

export const AdminRoute = {
  landing: makeURL(['app', 'admin']),
  users: makeURL(['app', 'admin', 'users']),
  view: makeURL(['app', 'admin', 'users', 'userId', 'view']),
  createIndividualIdentity: '/app/admin/users/:userId/createIndividual',
  createCorporateIdentity: '/app/admin/users/:userId/createCorporate',
  createIssuerIdentity: '/app/admin/users/:userId/createIssuer',
  identities: '/app/admin/identities',
  viewIndividualIdentity: '/app/admin/identies/individual/:userId/view',
  viewCorporateIdentity:
    '/app/admin/identies/corporate/:userId/:identityId/view',
  virtualAccount: '/app/admin/virtual-account',
  banner: '/app/admin/banner',
  masDisclosure: '/app/admin/masDisclosure',
  virtualAccountAudit: '/app/admin/virtual-account-audit',
  virtualAccountTransactions: '/app/admin/virtual-account-transactions',
  custodyManagement: '/app/admin/custody-management',
  clientSpaces: '/app/admin/client-spaces',
  createClientSpace: '/app/admin/client-spaces/create',
  viewClientSpace: '/app/admin/client-spaces/:tenantId/view',
  editClientSpace: '/app/admin/client-spaces/:tenantId/edit',
  whitelistWalletAddresses: '/app/admin/whitelist-wallet-addresses',
  tokenTransactions: '/app/admin/token-transactions'
}

export const CustodyManagementRoute = {
  main: '/app/admin/custody-management',
  custodyDetails: '/app/admin/custody-management/:accountId/details'
}

export const WhitelistWalletAddressesRoute = {
  list: AdminRoute.whitelistWalletAddresses,
  create: AdminRoute.whitelistWalletAddresses + '/create'
}

export const VirtualAccountsRoute = {
  transactions: {
    list: AdminRoute.virtualAccountTransactions,
    create: AdminRoute.virtualAccountTransactions + '/create'
  }
}

export const adminLandingLinks: InternalRouteProps[] = [
  {
    label: 'Identities',
    path: AdminRoute.identities,
    icon: IndividualIcon
  },
  {
    label: 'Users',
    path: AdminRoute.users,
    icon: UsersIcon
  },
  {
    label: 'Virtual Account',
    path: AdminRoute.virtualAccount,
    icon: VirtualAccountIcon
  },
  {
    label: 'Banner',
    path: AdminRoute.banner,
    icon: BannerIcon
  },
  {
    label: 'Disclosure',
    path: AdminRoute.masDisclosure,
    icon: MasDisclosureIcon
  },
  {
    label: 'Virtual Account Transactions',
    path: AdminRoute.virtualAccountTransactions,
    icon: VATransactionsIcon
  },
  {
    label: 'Virtual Account Audit',
    path: AdminRoute.virtualAccountAudit,
    icon: VAAuditIcon
  },
  {
    label: 'Custody Management',
    path: AdminRoute.custodyManagement,
    icon: CustodyManagementIcon
  },
  {
    label: 'Client Spaces',
    path: AdminRoute.clientSpaces,
    icon: IndividualIcon
  },
  {
    label: 'Whitelist Wallet Addresses',
    path: AdminRoute.whitelistWalletAddresses,
    icon: WhitelistIcon
  },
  {
    label: 'Token Transactions',
    path: AdminRoute.tokenTransactions,
    icon: TokenTransactionsIcon
  }
]
