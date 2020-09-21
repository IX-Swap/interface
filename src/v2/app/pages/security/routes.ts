import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'

import { ChangePassword } from './pages/changePassword/ChangePassword'
import { Landing } from './pages/landing/Landing'
import { Setup2fa } from './pages/setup2fa/Setup2fa'

const SecurityRoute = {
  landing: '/app/security',
  changePassword: '/app/security/change-password',
  setup2fa: '/app/security/setup-2fa'
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
