import { InternalRouteProps } from 'v2/types/util'
import { AuthorizerRoot } from 'v2/app/authorizer/AuthorizerRoot'
import Identity from 'v2/app/identity'
import Accounts from 'v2/app/accounts'
import Issuance from 'v2/app/issuance'
import Invest from 'v2/app/invest'
import Admin from 'v2/app/admin'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'

export const AppRoute = {
  authorizer: '/app/authorizer',
  identity: '/app/identity',
  accounts: '/app/accounts',
  issuance: '/app/issuance',
  invest: '/app/invest',
  admin: '/app/admin'
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
  }
]

export const useAppRouter = generateAppRouterHook<typeof AppRoute>(
  AppRoute,
  AppRoute.identity,
  appRoutes
)
