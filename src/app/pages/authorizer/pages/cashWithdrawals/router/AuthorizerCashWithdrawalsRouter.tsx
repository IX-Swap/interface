import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CashWithdrawalAuthorization } from 'app/pages/authorizer/pages/cashWithdrawals/CashWithdrawalAuthorization'
import { CashWithdrawals } from 'app/pages/authorizer/pages/cashWithdrawals/CashWithdrawals'

export const AuthorizerCashWithdrawalsRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Cash Withdrawal Details'
        path='/app/authorizer/cash-withdrawals/:userId/:cashWithdrawalId/:status/view'
      >
        <CashWithdrawalAuthorization/>
      </AppRoute>

      <AppRoute path={AuthorizerRoute.cashWithdrawals}>
        <CashWithdrawals />
      </AppRoute>
    </Switch>
  )
}