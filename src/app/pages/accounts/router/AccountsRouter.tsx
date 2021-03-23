import React from 'react'
import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { Balances } from 'app/pages/accounts/pages/balances/Balances'
import { Banks } from 'app/pages/accounts/pages/banks/Banks'
import { DepositCash } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositCash'
import { WithdrawCash } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawCash'
import { DigitalSecurities } from 'app/pages/accounts/pages/digitalSecurities/DigitalSecurities'
import { Transactions } from 'app/pages/accounts/pages/transactions/Transactions'
import { WithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddresses'
import {
  accountsLandingLinks,
  AccountsRoute
} from 'app/pages/accounts/router/config'
import { Switch, Route } from 'react-router-dom'

export const AccountsRouter = () => {
  return (
    <Switch>
      <Route path={AccountsRoute.banks}>
        <Banks />
      </Route>

      <Route path={AccountsRoute.depositCash}>
        <DepositCash />
      </Route>

      <Route path={AccountsRoute.withdrawCash}>
        <WithdrawCash />
      </Route>

      <Route path={AccountsRoute.balances}>
        <Balances />
      </Route>

      <Route path={AccountsRoute.digitalSecurities}>
        <DigitalSecurities />
      </Route>

      <Route path={AccountsRoute.transactions}>
        <Transactions />
      </Route>

      <Route path={AccountsRoute.withdrawalAddresses}>
        <WithdrawalAddresses />
      </Route>

      <Route path={AccountsRoute.landing}>
        <LandingPage label='' path='' links={accountsLandingLinks} />
      </Route>
    </Switch>
  )
}
