import React from 'react'
import { AppRoute } from 'app/router/config'
import { NewAppRoute } from 'components/NewAppRoute'
import { Switch } from 'react-router-dom'
import { HomeRoot } from 'app/pages/home/HomeRoot'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'
import { NotificationsRoot } from 'app/pages/notifications/NotificationsRoot'
import { AccountsRoot } from 'app/pages/accounts/AccountsRoot'
import { IdentityRoot } from 'app/pages/_identity/IdentityRoot'
import { InvestRoot } from 'app/pages/invest/InvestRoot'
import { AdminRoot } from 'app/pages/admin/AdminRoot'
import { AuthorizerRoot } from 'app/pages/authorizer/AuthorizerRoot'

export const AppRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='Accounts' path={AppRoute.accounts}>
        <AccountsRoot />
      </NewAppRoute>

      <NewAppRoute path={AppRoute.home}>
        <HomeRoot />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Identity' path={AppRoute.identity}>
        <IdentityRoot />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Issuance' path={AppRoute.issuance}>
        <IssuanceRoot />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Invest' path={AppRoute.invest}>
        <InvestRoot />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Admin' path={AppRoute.admin}>
        <AdminRoot />
      </NewAppRoute>

      <NewAppRoute path={AppRoute.security}>
        <SecurityRoot />
      </NewAppRoute>

      <NewAppRoute path={AppRoute.notifications}>
        <NotificationsRoot />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Authorization' path={AppRoute.authorizer}>
        <AuthorizerRoot />
      </NewAppRoute>
    </Switch>
  )
}
