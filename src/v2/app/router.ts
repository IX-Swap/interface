import { InternalRouteProps } from 'v2/types/util'
import { AuthorizerRoot } from 'v2/app/pages/authorizer/AuthorizerRoot'
import { IdentityRoot } from 'v2/app/pages/identity/IdentityRoot'
import { AccountsRoot } from 'v2/app/pages/accounts/AccountsRoot'
import { IssuanceRoot } from 'v2/app/pages/issuance/IssuanceRoot'
import { InvestRoot } from 'v2/app/pages/invest/InvestRoot'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { SecurityRoot } from 'v2/app/pages/security/SecurityRoot'
import { NotificationsRoot } from 'v2/app/pages/notifications/NotificationsRoot'
import { makeURL } from 'v2/config/urls'
import { AdminRoot } from 'v2/app/pages/admin/AdminRoot'
import { AppRole } from 'v2/helpers/acl'

export const AppRoute = {
  authorizer: makeURL(['app', 'authorizer']),
  identity: makeURL(['app', 'identity']),
  accounts: makeURL(['app', 'account']),
  issuance: makeURL(['app', 'issuance']),
  invest: makeURL(['app', 'invest']),
  admin: makeURL(['app', 'admin']),
  security: makeURL(['app', 'settings']),
  notifications: makeURL(['app', 'notifications'])
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
  }
]

export const useAppRouter = generateAppRouterHook<typeof AppRoute>(
  AppRoute,
  AppRoute.accounts,
  appRoutes
)
