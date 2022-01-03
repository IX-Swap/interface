import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { DSWithdrawalAuthorization } from 'app/pages/authorizer/pages/dsWithdrawals/DSWithdrawalAuthorization'
import { DSWithdrawals } from 'app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'

export const AuthorizerDSWithdrwalsRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Digital Security Withdrawals'
        path='/app/authorizer/digital-security-withdrawals/:userId/:dsWithdrawalId/view'
      >
        <DSWithdrawalAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.dsWithdrawals}>
        <DSWithdrawals />
      </AppRoute>
    </Switch>
  )
}
