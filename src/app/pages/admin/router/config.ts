import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'
import { ReactComponent as IndividualIcon } from 'assets/icons/navigation/individual.svg'
import { ReactComponent as UsersIcon } from 'assets/icons/navigation/users.svg'
import { ReactComponent as CashWithdrawalIcon } from 'assets/icons/navigation/cash-withdrawal.svg'
import { ReactComponent as VirtualAccountIcon } from 'assets/icons/navigation/virtual-account.svg'

export const AdminRoute = {
  landing: makeURL(['app', 'admin']),
  users: makeURL(['app', 'admin', 'users']),
  view: makeURL(['app', 'admin', 'users', 'userId', 'view']),
  accessReports: makeURL(['app', 'admin', 'accessReports']),
  createIndividualIdentity: '/app/admin/users/:userId/createIndividual',
  createCorporateIdentity: '/app/admin/users/:userId/createCorporate',
  createIssuerIdentity: '/app/admin/users/:userId/createIssuer',
  identities: '/app/admin/identities',
  virtualAccount: '/app/admin/virtualAccount'
}

export const adminLandingLinks: InternalRouteProps[] = [
  {
    label: 'Identities',
    path: AdminRoute.identities,
    color: '#90A30F',
    icon: IndividualIcon
  },
  {
    label: 'Access Reports',
    path: AdminRoute.accessReports,
    color: '#E6D200',
    icon: CashWithdrawalIcon
  },
  {
    label: 'Users',
    path: AdminRoute.users,
    color: '#01A2FF',
    icon: UsersIcon
  },
  {
    label: 'Virtual Account',
    path: AdminRoute.virtualAccount,
    color: '#0FA3A3',
    icon: VirtualAccountIcon
  }
]
