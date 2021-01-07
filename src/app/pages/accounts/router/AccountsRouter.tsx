import React from 'react'
import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { Balances } from 'app/pages/accounts/pages/balances/Balances'
import { Banks } from 'app/pages/accounts/pages/banks/Banks'
import { DepositCash } from 'app/pages/accounts/pages/banks/DepositCash/DepositCash'
import { WithdrawCash } from 'app/pages/accounts/pages/banks/WithdrawCash/WithdrawCash'
import { DigitalSecurities } from 'app/pages/accounts/pages/digitalSecurities/DigitalSecurities'
import { Transactions } from 'app/pages/accounts/pages/transactions/Transactions'
import { WithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddresses'
import { accountsLandingLinks } from 'app/pages/accounts/router/config'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

export const AccountsRouter = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}/bank-accounts`} component={Banks} />

      <Route exact path={`${path}/cash-deposits`} component={DepositCash} />

      <Route exact path={`${path}/cash-withdrawals`} component={WithdrawCash} />

      <Route exact path='/app/accounts/balances' component={Balances} />

      <Route
        exact
        path={`${path}/digital-security`}
        component={DigitalSecurities}
      />

      <Route exact path='/app/accounts/transactions' component={Transactions} />

      <Route
        exact
        path={`${path}/withdrawal-addresses`}
        component={WithdrawalAddresses}
      />

      <Route
        exact
        path={`${path}`}
        component={() => (
          <LandingPage label='' path='' links={accountsLandingLinks} />
        )}
      />
    </Switch>
  )
}
