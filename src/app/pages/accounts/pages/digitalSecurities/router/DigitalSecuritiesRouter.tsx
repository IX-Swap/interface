import React from 'react'
import { DSDeposit } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'
import { DSList } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSList'
import { DSWithdraw } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/DSWithdraw'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'

export const DigitalSecuritiesRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Deposit' path={DSRoute.deposit}>
        <DSDeposit />
      </AppRoute>

      <AppRoute breadcrumb='Withdraw' path={DSRoute.withdraw}>
        <DSWithdraw />
      </AppRoute>

      <AppRoute path={DSRoute.list}>
        <DSList />
      </AppRoute>
    </Switch>
  )
}
