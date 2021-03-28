import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Confirmation } from 'auth/pages/confirmation/Confirmation'
import { LoginContainer } from 'auth/pages/login/LoginContainer'
import { PasswordReset } from 'auth/pages/password-reset/PasswordReset'
import { Register } from 'auth/pages/register/Register'
import { AuthRoute } from 'auth/router/config'
import { NewAppRoute } from 'components/NewAppRoute'

export const AuthRouter = () => {
  return (
    <Switch>
      <NewAppRoute exact path={AuthRoute.login}>
        <LoginContainer />
      </NewAppRoute>

      <NewAppRoute exact path={AuthRoute.signup}>
        <Register />
      </NewAppRoute>

      <NewAppRoute exact path={AuthRoute.passwordReset}>
        <PasswordReset />
      </NewAppRoute>

      <NewAppRoute exact path={AuthRoute.confirm}>
        <Confirmation />
      </NewAppRoute>

      <Redirect to={AuthRoute.login} />
    </Switch>
  )
}
