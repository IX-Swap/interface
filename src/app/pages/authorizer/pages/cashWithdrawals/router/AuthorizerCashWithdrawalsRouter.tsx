import React from 'react'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { CashWithdrawalAuthorization } from 'app/pages/authorizer/pages/cashWithdrawals/CashWithdrawalAuthorization'
import { CashWithdrawals } from 'app/pages/authorizer/pages/cashWithdrawals/CashWithdrawals'

export const AuthorizerCashWithdrawalsRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Cash Withdrawal Details'
        path='/app/authorizer/cash-withdrawals/:userId/:cashWithdrawalId/view'
      >
        <CashWithdrawalAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.cashWithdrawals}>
        <CashWithdrawals />
      </NewAppRoute>
    </Switch>
  )
}
