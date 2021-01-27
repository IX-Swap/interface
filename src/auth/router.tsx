import { Register } from 'auth/pages/register/Register'
import { PasswordReset } from 'auth/pages/password-reset/PasswordReset'
import { InternalRouteProps } from 'types/util'
import { generateAppRouterHook } from 'helpers/generateAppRouterHook'
import { Confirmation } from 'auth/pages/confirmation/Confirmation'
import { LoginContainer } from 'auth/pages/login/LoginContainer'

export const AuthRoute = {
  login: '/auth/sign-in',
  signup: '/auth/register',
  confirm: '/auth/confirm',
  passwordReset: '/auth/reset'
}

const authRoutes: InternalRouteProps[] = [
  {
    label: 'Login',
    path: AuthRoute.login,
    component: LoginContainer,
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
