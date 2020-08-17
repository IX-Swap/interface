import Login from 'v2/Auth/Login/Login'
import Register from 'v2/Auth/Register/Register'
import PasswordReset from 'v2/Auth/PasswordReset/PasswordReset'
import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'

export const AuthRoute = {
  login: '/auth/login',
  signup: '/auth/register',
  passwordReset: '/auth/password-reset'
}

interface AppRouter {
  current: string
  routes: typeof AuthRoute
  renderRoutes: () => JSX.Element
  push: (route: keyof typeof AuthRoute) => void
}

const authRoutes: InternalRouteProps[] = [
  {
    label: 'Login',
    path: AuthRoute.login,
    component: Login,
    exact: true
  },
  {
    label: 'Register',
    path: AuthRoute.signup,
    component: Register,
    exact: true
  },
  {
    label: 'Reset Password',
    path: AuthRoute.passwordReset,
    component: PasswordReset,
    exact: true
  }
]

export const useAuthRouter = generateAppRouterHook<typeof AuthRoute>(
  AuthRoute,
  AuthRoute.login,
  authRoutes
)
