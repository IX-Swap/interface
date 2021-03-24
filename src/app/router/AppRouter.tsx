import React from 'react'
import { AppRoute } from 'app/router/config'
import { NewAppRoute } from 'components/NewAppRoute'
import { Switch } from 'react-router-dom'
import { HomeRoot } from 'app/pages/home/HomeRoot'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'
import { NotificationsRoot } from 'app/pages/notifications/NotificationsRoot'
import { AccountsRouter } from 'app/pages/accounts/router/AccountsRouter'
import { IdentityRouter } from 'app/pages/_identity/router/IdentityRouter'
import { InvestRouter } from 'app/pages/invest/router/InvestRouter'
import { AdminRouter } from 'app/pages/admin/router/AdminRouter'

export const AppRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='Accounts' path={AppRoute.accounts}>
        <AccountsRouter />
      </NewAppRoute>

      <NewAppRoute path={AppRoute.home}>
        <HomeRoot />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Identity' path={AppRoute.identity}>
        <IdentityRouter />
      </NewAppRoute>

      <NewAppRoute path={AppRoute.issuance}>
        <IssuanceRoot />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Invest' path={AppRoute.invest}>
        <InvestRouter />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Admin' path={AppRoute.admin}>
        <AdminRouter />
      </NewAppRoute>

      <NewAppRoute path={AppRoute.security}>
        <SecurityRoot />
      </NewAppRoute>

      <NewAppRoute path={AppRoute.notifications}>
        <NotificationsRoot />
      </NewAppRoute>
    </Switch>
  )
}
