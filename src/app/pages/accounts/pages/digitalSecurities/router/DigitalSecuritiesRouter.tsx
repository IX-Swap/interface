import React from 'react'
import { DSDeposit } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'
import { DSList } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSList'
import { DSWithdraw } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/DSWithdraw'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import { Route, Switch } from 'react-router-dom'

export const DigitalSecuritiesRouter = () => {
  return (
    <Switch>
      <Route path={DSRoute.deposit}>
        <DSDeposit />
      </Route>

      <Route path={DSRoute.withdraw}>
        <DSWithdraw />
      </Route>

      <Route path={DSRoute.list}>
        <DSList />
      </Route>
    </Switch>
  )
}
