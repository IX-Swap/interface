import React from 'react'
import { DSDeposit } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'
import { DSList } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSList'
import { DSWithdraw } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/DSWithdraw'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import { Switch } from 'react-router-dom'
import { NewAppRoute } from 'components/NewAppRoute'

export const DigitalSecuritiesRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='Deposit' path={DSRoute.deposit}>
        <DSDeposit />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Withdraw' path={DSRoute.withdraw}>
        <DSWithdraw />
      </NewAppRoute>

      <NewAppRoute path={DSRoute.list}>
        <DSList />
      </NewAppRoute>
    </Switch>
  )
}
