import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { Confirmation } from 'auth/pages/confirmation/Confirmation'
import { LoginContainer } from 'auth/pages/login/LoginContainer'
import { PasswordReset } from 'auth/pages/password-reset/PasswordReset'
import { Register } from 'auth/pages/register/Register'
import { AuthRoute } from 'auth/router/config'
import { AppRoute } from 'components/AppRoute'

export const AuthRouter = () => {
  return (
    <Switch>
      <AppRoute path={AuthRoute.login}>
        <LoginContainer />
      </AppRoute>

      <AppRoute path={AuthRoute.signup}>
        <Register />
      </AppRoute>

      <AppRoute path={AuthRoute.passwordReset}>
        <PasswordReset />
      </AppRoute>

      <AppRoute path={AuthRoute.confirm}>
        <Confirmation />
      </AppRoute>

      <Redirect to={AuthRoute.login} />
    </Switch>
  )
}
