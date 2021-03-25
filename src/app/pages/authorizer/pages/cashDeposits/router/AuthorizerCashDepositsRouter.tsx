import React from 'react'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CashDeposits } from 'app/pages/authorizer/pages/cashDeposits/CashDeposits'
import { CashDepositAuthorization } from 'app/pages/authorizer/pages/cashDeposits/CashDepositAuthorization'

export const AuthorizerCashDepositsRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Cash Deposit Details'
        path='/app/authorizer/cash-deposits/:userId/:cashDepositId/view'
      >
        <CashDepositAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.cashDeposits}>
        <CashDeposits />
      </NewAppRoute>
    </Switch>
  )
}
