import React from 'react'
import { Banks } from 'app/pages/authorizer/pages/banks/Banks'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { BankAuthorization } from 'app/pages/authorizer/pages/banks/BankAuthorization'

export const AuthorizerBanksRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Bank Account Details'
        path='/app/authorizer/bank-accounts/:userId/:bankId/view'
      >
        <BankAuthorization />
      </AppRoute>

      <AppRoute exact path={AuthorizerRoute.banks}>
        <Banks />
      </AppRoute>
    </Switch>
  )
}
