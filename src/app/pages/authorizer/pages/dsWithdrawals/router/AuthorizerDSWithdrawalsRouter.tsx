import React from 'react'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { DSWithdrawalAuthorization } from 'app/pages/authorizer/pages/dsWithdrawals/DSWithdrawalAuthorization'
import { DSWithdrawals } from 'app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'

export const AuthorizerDSWithdrwalsRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Digital Security Withdrawals'
        path='/app/authorizer/digital-security-withdrawals/:userId/:dsWithdrawalId/view'
      >
        <DSWithdrawalAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.dsWithdrawals}>
        <DSWithdrawals />
      </NewAppRoute>
    </Switch>
  )
}
