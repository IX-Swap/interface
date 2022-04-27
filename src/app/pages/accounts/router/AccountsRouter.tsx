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
import { AppRoute } from 'components/AppRoute'
import { BanksRouter } from 'app/pages/accounts/pages/banks/router/BanksRouter'
import { DigitalSecuritiesRouter } from 'app/pages/accounts/pages/digitalSecurities/router/DigitalSecuritiesRouter'
import { WithdrawalAddressesRouter } from 'app/pages/accounts/pages/withdrawalAddresses/router/WithdrawalAddressesRouter'
import { CommitmentsRouter } from 'app/pages/accounts/pages/commitments/router/CommitmentsRouter'
import { Dashboard } from 'app/pages/accounts/pages/dashboard/Dashboard'
import { ReportsRouter } from 'app/pages/accounts/pages/reports/router/ReportsRouter'
import { RootContainer } from 'ui/RootContainer'

export const AccountsRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Bank Accounts' path={AccountsRoute.banks}>
        <BanksRouter />
      </AppRoute>

      <AppRoute breadcrumb='Cash Deposits' path={AccountsRoute.depositCash}>
        <DepositCash />
      </AppRoute>

      <AppRoute breadcrumb='Commitments' path={AccountsRoute.commitments}>
        <CommitmentsRouter />
      </AppRoute>

      <AppRoute breadcrumb='Cash Withdrawals' path={AccountsRoute.withdrawCash}>
        <WithdrawCash />
      </AppRoute>

      <AppRoute breadcrumb='Asset Balances' path={AccountsRoute.balances}>
        <Balances />
      </AppRoute>

      <AppRoute
        breadcrumb='Digital Securities'
        path={AccountsRoute.digitalSecurities}
      >
        <DigitalSecuritiesRouter />
      </AppRoute>

      <AppRoute breadcrumb='Transactions' path={AccountsRoute.transactions}>
        <Transactions />
      </AppRoute>

      <AppRoute
        breadcrumb='My Blockchain Addresses'
        path={AccountsRoute.withdrawalAddresses}
      >
        <WithdrawalAddressesRouter />
      </AppRoute>

      <AppRoute breadcrumb='Dashboard' path={AccountsRoute.dashboard}>
        <RootContainer>
          <Dashboard />
        </RootContainer>
      </AppRoute>

      <AppRoute breadcrumb='My Reports' path={AccountsRoute.reports}>
        <ReportsRouter />
      </AppRoute>

      <AppRoute path={AccountsRoute.landing}>
        <LandingPage title='Accounts' links={accountsLandingLinks} />
      </AppRoute>
    </Switch>
  )
}
