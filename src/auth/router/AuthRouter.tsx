import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { Confirmation } from 'auth/pages/confirmation/Confirmation'
import { LoginContainer } from 'auth/pages/login/LoginContainer'
import { PasswordReset } from 'auth/pages/password-reset/PasswordReset'
import { Register } from 'auth/pages/register/Register'
import { AuthRoute } from 'auth/router/config'
import { AppRoute } from 'components/AppRoute'
import { SuccessfulSignup } from 'auth/pages/successful-signup/SuccessfulSignup'
import { SuccessfulReset } from 'auth/pages/successful-reset/SuccessfulReset'
import { InvitationDeclie } from 'auth/pages/invitation/InvitationDecline'
import { MyInfo } from 'auth/pages/myinfo/myinfo'

export const AuthRouter = () => {
  return (
    <Switch>
      <AppRoute exact path={AuthRoute.login}>
        <LoginContainer />
      </AppRoute>

      <AppRoute exact path={AuthRoute.signup}>
        <Register />
      </AppRoute>

      <AppRoute exact path={AuthRoute.successfulSignup}>
        <SuccessfulSignup />
      </AppRoute>

      <AppRoute exact path={AuthRoute.passwordReset}>
        <PasswordReset />
      </AppRoute>

      <AppRoute exact path={AuthRoute.successfulPasswordReset}>
        <SuccessfulReset />
      </AppRoute>

      <AppRoute exact path={AuthRoute.confirm}>
        <Confirmation />
      </AppRoute>

      <AppRoute exact path={AuthRoute.declineInvitation}>
        <InvitationDeclie />
      </AppRoute>

      <AppRoute exact path={AuthRoute.myinfoError}>
        <MyInfo />
      </AppRoute>

      <Redirect to={AuthRoute.login} />
    </Switch>
  )
}
