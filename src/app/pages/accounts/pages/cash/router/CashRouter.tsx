import { BanksRouter } from 'app/pages/accounts/pages/banks/router/BanksRouter'
import { Deposit } from 'app/pages/accounts/pages/deposit/Deposit'
import { Withdraw } from 'app/pages/accounts/pages/withdraw/Withdraw'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'
import { Cash } from '../Cash'

export const CashRouter = () => {
  return (
    <Switch>
      <AppRoute path={AccountsRoute.cash} exact>
        <Cash />
      </AppRoute>
      <AppRoute breadcrumb='Withdraw' path={AccountsRoute.withdraw}>
        <Withdraw />
      </AppRoute>
      <AppRoute breadcrumb='Deposit' path={AccountsRoute.deposit}>
        <Deposit />
      </AppRoute>
      <AppRoute breadcrumb='Bank Accounts' path={AccountsRoute.banks}>
        <BanksRouter />
      </AppRoute>
    </Switch>
  )
}
