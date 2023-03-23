import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { WithdrawalAddressAuthorization } from 'app/pages/authorizer/pages/withdrawalAddresses/WithdrawalAddressAuthorization'
import { WithdrawalAddresses } from 'app/pages/authorizer/pages/withdrawalAddresses/WithdrawalAddresses'

export const AuthorizerWithdrawalAddressesRouter = () => {
  return (
    <Switch>
      <AppRoute
        exact
        breadcrumb='Blockchain Address Details'
        path='/app/authorizer/blockchain-addresses/:userId/:addressId/view'
      >
        <WithdrawalAddressAuthorization />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.withdrawalAddresses}>
        <WithdrawalAddresses />
      </AppRoute>
    </Switch>
  )
}
