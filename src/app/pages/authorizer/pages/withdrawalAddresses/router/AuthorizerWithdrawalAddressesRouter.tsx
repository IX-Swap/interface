import React from 'react'
import { Switch } from 'react-router'
import { NewAppRoute } from 'components/NewAppRoute'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { WithdrawalAddressAuthorization } from 'app/pages/authorizer/pages/withdrawalAddresses/WithdrawalAddressAuthorization'
import { WithdrawalAddresses } from 'app/pages/authorizer/pages/withdrawalAddresses/WithdrawalAddresses'

export const AuthorizerWithdrawalAddressesRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        exact
        breadcrumb='Withdrawal Address Details'
        path='/app/authorizer/withdrawal-addresses/:userId/:addressId/view'
      >
        <WithdrawalAddressAuthorization />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.withdrawalAddresses}>
        <WithdrawalAddresses />
      </NewAppRoute>
    </Switch>
  )
}
