import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { CommitmentsRouter } from 'app/pages/accounts/pages/commitments/router/CommitmentsRouter'
// import { Dashboard } from 'app/pages/accounts/pages/dashboard/Dashboard'
import { DigitalSecuritiesRouter } from 'app/pages/accounts/pages/digitalSecurities/router/DigitalSecuritiesRouter'
import { MyHoldings } from 'app/pages/accounts/pages/holdings/MyHoldings'
// import { ReportsRouter } from 'app/pages/accounts/pages/reports/router/ReportsRouter'
import { Transactions } from 'app/pages/accounts/pages/transactions/Transactions'
import { WithdrawalAddressesRouter } from 'app/pages/accounts/pages/withdrawalAddresses/router/WithdrawalAddressesRouter'
import {
  accountsLandingLinks,
  AccountsRoute
} from 'app/pages/accounts/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'
// import { RootContainer } from 'ui/RootContainer'
import { CashRouter } from '../pages/cash/router/CashRouter'
import { CommitmentsRouter as InvestmentsRouter } from 'app/pages/invest/router/CommitmentsRouter'

export const AccountsRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Commitments' path={AccountsRoute.commitments}>
        <CommitmentsRouter />
      </AppRoute>
      <AppRoute breadcrumb='My Tokens' path={AccountsRoute.digitalSecurities}>
        <DigitalSecuritiesRouter />
      </AppRoute>

      <AppRoute breadcrumb='Transactions' path={AccountsRoute.transactions}>
        <Transactions />
      </AppRoute>

      <AppRoute
        breadcrumb='My Wallet Addresses'
        path={AccountsRoute.withdrawalAddresses}
      >
        <WithdrawalAddressesRouter />
      </AppRoute>

      {/* <AppRoute breadcrumb='Dashboard' path={AccountsRoute.dashboard}>
        <RootContainer>
          <Dashboard />
        </RootContainer>
      </AppRoute> */}

      {/* <AppRoute breadcrumb='My Reports' path={AccountsRoute.reports}>
        <ReportsRouter />
      </AppRoute> */}

      <AppRoute breadcrumb='IX Exchange Orders' path={AccountsRoute.myHoldings}>
        <MyHoldings />
      </AppRoute>
      <AppRoute breadcrumb='My Investments' path={AccountsRoute.myInvestments}>
        <InvestmentsRouter />
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
