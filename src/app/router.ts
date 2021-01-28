import { InternalRouteProps } from 'types/util'
import { AuthorizerRoot } from 'app/pages/authorizer/AuthorizerRoot'
import { IdentityRoot } from 'app/pages/identity/IdentityRoot'
import { AccountsRoot } from 'app/pages/accounts/AccountsRoot'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'
import { InvestRoot } from 'app/pages/invest/InvestRoot'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'
import { NotificationsRoot } from 'app/pages/notifications/NotificationsRoot'
import { makeURL } from 'config/appURL'
import { AdminRoot } from 'app/pages/admin/AdminRoot'
import { AppRole } from 'helpers/acl'
import { HomeRoot } from 'app/pages/home/HomeRoot'

export const AppRoute = {
  authorizer: makeURL(['app', 'authorizer']),
  identity: makeURL(['app', 'identity']),
  accounts: makeURL(['app', 'account']),
  issuance: makeURL(['app', 'issuance']),
  invest: makeURL(['app', 'invest']),
  admin: makeURL(['app', 'admin']),
  security: makeURL(['app', 'settings']),
  notifications: makeURL(['app', 'notifications']),
  home: makeURL(['app', 'home'])
}

export const appRoutes: InternalRouteProps[] = [
  {
    label: 'Authorization',
    path: AppRoute.authorizer,
    component: AuthorizerRoot,
    authorizations: [AppRole.AUTHORIZER, AppRole.ADMIN]
  },
  {
    label: 'Identity',
    path: AppRoute.identity,
    component: IdentityRoot
  },
  {
    label: 'Accounts',
    path: AppRoute.accounts,
    component: AccountsRoot,
    authorizations: [AppRole.ACCREDITED]
  },
  {
    label: 'Issuance',
    path: AppRoute.issuance,
    component: IssuanceRoot,
    authorizations: [AppRole.ISSUER]
  },
  {
    label: 'Invest',
    path: AppRoute.invest,
    component: InvestRoot,
    authorizations: [AppRole.ACCREDITED]
  },
  {
    label: 'Users',
    path: AppRoute.admin,
    component: AdminRoot,
    authorizations: [AppRole.ADMIN]
  },
  {
    label: 'Settings',
    path: AppRoute.security,
    component: SecurityRoot
  },
  {
    label: 'Notifications',
    path: AppRoute.notifications,
    component: NotificationsRoot
  },
  {
    label: 'Home',
    path: AppRoute.home,
    component: HomeRoot
  }
]

export const useAppRouter = generateAppRouterHook<typeof AppRoute>(
  AppRoute,
  AppRoute.accounts,
  appRoutes
)
