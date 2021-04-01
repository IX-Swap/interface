import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { WithdrawalAddressCreate } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WithdrawalAddressCreate'
import { WithdrawalAddressesList } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesList'
import { WithdrawalAddressView } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WithdrawalAddressView'

export const WithdrawalAddressesRouter = () => {
  return (
    <Switch>
      <Route path={WithdrawalAddressesRoute.list}>
        <WithdrawalAddressesList />

        <Route path={WithdrawalAddressesRoute.view}>
          <WithdrawalAddressView />
        </Route>

        <Route path={WithdrawalAddressesRoute.create}>
          <WithdrawalAddressCreate />
        </Route>
      </Route>
    </Switch>
  )
}
