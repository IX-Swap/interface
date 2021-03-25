import React from 'react'
import { Banks } from 'app/pages/authorizer/pages/banks/Banks'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { BankAuthorization } from 'app/pages/authorizer/pages/banks/BankAuthorization'

export const AuthorizerBanksRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Bank Account Details'
        path='/app/authorizer/bank-accounts/:userId/:bankId/view'
      >
        <BankAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.banks}>
        <Banks />
      </NewAppRoute>
    </Switch>
  )
}
