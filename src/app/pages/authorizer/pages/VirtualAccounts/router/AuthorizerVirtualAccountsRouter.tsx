import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { VirtualAccounts } from 'app/pages/authorizer/pages/VirtualAccounts/VirtualAccounts'
import { VirtualAccountAuthorization } from 'app/pages/authorizer/pages/VirtualAccounts/VirtualAccountAuthorization'

export const AuthorizerVirtualAccountsRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Virtual Account Details'
        path='/app/authorizer/virtual-accounts/:id/view'
      >
        <VirtualAccountAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.virtualAccounts}>
        <VirtualAccounts />
      </AppRoute>
    </Switch>
  )
}
