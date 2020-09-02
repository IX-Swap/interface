import { Login } from 'v2/auth/pages/login/Login'
import { Register } from 'v2/auth/pages/register/Register'
import { PasswordReset } from 'v2/auth/pages/password-reset/PasswordReset'
import { InternalRouteProps } from 'v2/types/util'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { Confirmation } from 'v2/auth/pages/confirmation/Confirmation'

export const AuthRoute = {
  login: '/auth/login',
  signup: '/auth/register',
  confirm: '/auth/confirm',
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
  },
  {
    label: 'Confirm Registration',
    path: AuthRoute.confirm,
    component: Confirmation,
    exact: true
  }
]

export const useAuthRouter = generateAppRouterHook<typeof AuthRoute>(
  AuthRoute,
  AuthRoute.login,
  authRoutes
)
