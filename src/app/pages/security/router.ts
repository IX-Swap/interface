import { InternalRouteProps } from 'types/util'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { ChangePassword } from './pages/changePassword/ChangePassword'
import { Landing } from './pages/landing/Landing'
import { Setup2fa } from './pages/setup2fa/Setup2fa'
import { makeURL } from 'config/appURL'

export const SecurityRoute = {
  landing: makeURL(['app', 'settings']),
  changePassword: makeURL(['app', 'settings', 'changePassword']),
  setup2fa: makeURL(['app', 'settings', 'setup2fa'])
}

const securityRoutes: InternalRouteProps[] = [
  {
    label: 'Security',
    path: SecurityRoute.landing,
    exact: true,
    component: Landing
  },
  {
    label: 'Change Password',
    path: SecurityRoute.changePassword,
    component: ChangePassword
  },
  {
    label: 'Google Authenticator Setup',
    path: SecurityRoute.setup2fa,
    component: Setup2fa
  }
]

export const useSecurityRouter = generateAppRouterHook<typeof SecurityRoute>(
  SecurityRoute,
  SecurityRoute.landing,
  securityRoutes
)
