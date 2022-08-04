import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { DepositCash } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositCash'
import { WithdrawCash } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawCash'
import { CommitmentsRouter } from 'app/pages/accounts/pages/commitments/router/CommitmentsRouter'
import { Dashboard } from 'app/pages/accounts/pages/dashboard/Dashboard'
import { DigitalSecuritiesRouter } from 'app/pages/accounts/pages/digitalSecurities/router/DigitalSecuritiesRouter'
import { MyHoldings } from 'app/pages/accounts/pages/holdings/MyHoldings'
import { ReportsRouter } from 'app/pages/accounts/pages/reports/router/ReportsRouter'
import { Transactions } from 'app/pages/accounts/pages/transactions/Transactions'
import { WithdrawalAddressesRouter } from 'app/pages/accounts/pages/withdrawalAddresses/router/WithdrawalAddressesRouter'
import {
  accountsLandingLinks,
  AccountsRoute
} from 'app/pages/accounts/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'
import { RootContainer } from 'ui/RootContainer'
import { CashRouter } from '../pages/cash/router/CashRouter'

export const AccountsRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Cash Deposits' path={AccountsRoute.depositCash}>
        <DepositCash />
      </AppRoute>

      <AppRoute breadcrumb='Commitments' path={AccountsRoute.commitments}>
        <CommitmentsRouter />
      </AppRoute>

      <AppRoute breadcrumb='Cash Withdrawals' path={AccountsRoute.withdrawCash}>
        <WithdrawCash />
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

      <AppRoute
        breadcrumb='My Exchange Holdings'
        path={AccountsRoute.myHoldings}
      >
        <MyHoldings />
      </AppRoute>
      <AppRoute breadcrumb='Cash' path={AccountsRoute.cash}>
        <CashRouter />
      </AppRoute>
      <AppRoute path={AccountsRoute.landing} exact>
        <LandingPage title='Accounts' links={accountsLandingLinks} />
      </AppRoute>
    </Switch>
  )
}
