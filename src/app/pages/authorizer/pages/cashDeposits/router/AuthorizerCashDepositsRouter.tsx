import React from 'react'
import { Switch } from 'react-router'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CashDeposits } from 'app/pages/authorizer/pages/cashDeposits/CashDeposits'
import { CashDepositAuthorization } from 'app/pages/authorizer/pages/cashDeposits/CashDepositAuthorization'

export const AuthorizerCashDepositsRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Cash Deposit Details'
        path='/app/authorizer/cash-deposits/:userId/:cashDepositId/view'
      >
        <CashDepositAuthorization />
      </AppRoute>

      <AppRoute exact path={AuthorizerRoute.cashDeposits}>
        <CashDeposits />
      </AppRoute>
    </Switch>
  )
}
