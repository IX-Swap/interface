import Login from 'v2/auth/Login/Login'
import Register from 'v2/auth/Register/Register'
import PasswordReset from 'v2/auth/PasswordReset/PasswordReset'
import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'

export const AuthRoute = {
  login: '/auth/login',
  signup: '/auth/register',
  passwordReset: '/auth/password-reset'
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
