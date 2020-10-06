import { InternalRouteProps } from 'v2/types/util'
import { AuthorizerRoot } from 'v2/app/pages/authorizer/AuthorizerRoot'
import { Identity } from 'v2/app/pages/identity'
import { Accounts } from 'v2/app/pages/accounts/Accounts'
import { Issuance } from 'v2/app/pages/issuance/Issuance'
import { Invest } from 'v2/app/pages/invest/Invest'
import Admin from 'v2/app/pages/admin'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { SecurityRoot } from 'v2/app/pages/security'

export const AppRoute = {
  authorizer: '/app/authorizer',
  identity: '/app/identity',
  accounts: '/app/accounts',
  issuance: '/app/issuance',
  invest: '/app/invest',
  admin: '/app/admin',
  security: '/app/security'
}

const appRoutes: InternalRouteProps[] = [
  {
    label: 'Authorizer',
    path: AppRoute.authorizer,
    component: AuthorizerRoot
  },
  {
    label: 'Identity',
    path: AppRoute.identity,
    component: Identity
  },
  {
    label: 'Accounts',
    path: AppRoute.accounts,
    component: Accounts
  },
  {
    label: 'Issuance',
    path: AppRoute.issuance,
    component: Issuance
  },
  {
    label: 'Invest',
    path: AppRoute.invest,
    component: Invest
  },
  {
    label: 'Admin',
    path: AppRoute.admin,
    component: Admin
  },
  {
    label: 'Security',
    path: AppRoute.security,
    component: SecurityRoot
  }
]

export const useAppRouter = generateAppRouterHook<typeof AppRoute>(
  AppRoute,
  AppRoute.accounts,
  appRoutes
)
