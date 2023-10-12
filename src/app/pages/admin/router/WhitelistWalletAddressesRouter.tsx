import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { WhitelistWalletAddressesRoute } from 'app/pages/admin/router/config'
import { WhitelistWalletAddressesList } from '../pages/WhitelistWalletAddresses/WhitelistWalletAddressesList'
import { AddToWhitelist } from '../pages/WhitelistWalletAddresses/AddToWhitelist'

export const WhitelistWithdrawalAddressesRouter = () => {
  return (
    <Switch>
      <Route path={WhitelistWalletAddressesRoute.list}>
        <WhitelistWalletAddressesList />

        <Route path={WhitelistWalletAddressesRoute.create}>
          <AddToWhitelist />
        </Route>
      </Route>
    </Switch>
  )
}
