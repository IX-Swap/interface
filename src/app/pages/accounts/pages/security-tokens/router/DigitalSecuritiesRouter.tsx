import React from 'react'
import { Deposit } from 'app/pages/accounts/pages/security-tokens/Deposit/Deposit'
import { MyTokens } from 'app/pages/accounts/pages/security-tokens/MyTokens/MyTokens'
import { DSRoute } from 'app/pages/accounts/pages/security-tokens/router/config'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { Withdraw } from 'app/pages/accounts/pages/security-tokens/Withdraw/Withdraw'

export const DigitalSecuritiesRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Deposit' path={DSRoute.deposit}>
        <Deposit />
      </AppRoute>

      <AppRoute breadcrumb='Withdraw' path={DSRoute.withdraw}>
        <Withdraw />
      </AppRoute>

      <AppRoute path={DSRoute.list}>
        <MyTokens />
      </AppRoute>
    </Switch>
  )
}
