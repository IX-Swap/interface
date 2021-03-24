import React from 'react'
import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { Balances } from 'app/pages/accounts/pages/balances/Balances'
import { DepositCash } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositCash'
import { WithdrawCash } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawCash'
import { Transactions } from 'app/pages/accounts/pages/transactions/Transactions'
import {
  accountsLandingLinks,
  AccountsRoute
} from 'app/pages/accounts/router/config'
import { Switch } from 'react-router-dom'
import { NewAppRoute } from 'components/NewAppRoute'
import { BanksRouter } from 'app/pages/accounts/pages/banks/router/BanksRouter'
import { DigitalSecuritiesRouter } from 'app/pages/accounts/pages/digitalSecurities/router/DigitalSecuritiesRouter'
import { WithdrawalAddressesRouter } from 'app/pages/accounts/pages/withdrawalAddresses/router/WithdrawalAddressesRouter'

export const AccountsRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='Bank Accounts' path={AccountsRoute.banks}>
        <BanksRouter />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Cash Deposits' path={AccountsRoute.depositCash}>
        <DepositCash />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Cash Withdrawals'
        path={AccountsRoute.withdrawCash}
      >
        <WithdrawCash />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Asset Balances' path={AccountsRoute.balances}>
        <Balances />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Digital Securities'
        path={AccountsRoute.digitalSecurities}
      >
        <DigitalSecuritiesRouter />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Transactions' path={AccountsRoute.transactions}>
        <Transactions />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Withdrawal Addresses'
        path={AccountsRoute.withdrawalAddresses}
      >
        <WithdrawalAddressesRouter />
      </NewAppRoute>

      <NewAppRoute path={AccountsRoute.landing}>
        <LandingPage title='Accounts' links={accountsLandingLinks} />
      </NewAppRoute>
    </Switch>
  )
}
