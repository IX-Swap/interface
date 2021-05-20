import React from 'react'
import { AppRoute as AppPath } from 'app/router/config'
import { AppRoute } from 'components/AppRoute'
import { Redirect, Switch } from 'react-router-dom'
import { HomeRoot } from 'app/pages/home/HomeRoot'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'
import { NotificationsRoot } from 'app/pages/notifications/NotificationsRoot'
import { AccountsRoot } from 'app/pages/accounts/AccountsRoot'
import { IdentityRoot } from 'app/pages/identity/IdentityRoot'
import { InvestRoot } from 'app/pages/invest/InvestRoot'
import { AdminRoot } from 'app/pages/admin/AdminRoot'
import { AuthorizerRoot } from 'app/pages/authorizer/AuthorizerRoot'
import { MarketRoot } from 'app/pages/exchange/market/MarketRoot'

export const AppRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Accounts' path={AppPath.accounts}>
        <AccountsRoot />
      </AppRoute>

      <AppRoute path={AppPath.home}>
        <HomeRoot />
      </AppRoute>

      <AppRoute path={AppPath.market}>
        <MarketRoot />
      </AppRoute>

      <AppRoute breadcrumb='Identity' path={AppPath.identity}>
        <IdentityRoot />
      </AppRoute>

      <AppRoute breadcrumb='Issuance' path={AppPath.issuance}>
        <IssuanceRoot />
      </AppRoute>

      <AppRoute breadcrumb='Invest' path={AppPath.invest}>
        <InvestRoot />
      </AppRoute>

      <AppRoute breadcrumb='Admin' path={AppPath.admin}>
        <AdminRoot />
      </AppRoute>

      <AppRoute path={AppPath.security}>
        <SecurityRoot />
      </AppRoute>

      <AppRoute path={AppPath.notifications}>
        <NotificationsRoot />
      </AppRoute>

      <AppRoute breadcrumb='Authorization' path={AppPath.authorizer}>
        <AuthorizerRoot />
      </AppRoute>

      <Redirect to={AppPath.home} />
    </Switch>
  )
}
