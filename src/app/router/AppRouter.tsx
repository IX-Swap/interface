import React from 'react'
import { AppRoute as AppPath } from 'app/router/config'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router-dom'
import { EducationCentreRoot } from 'app/pages/educationCentre/EducationCentreRoot'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'
import { NotificationsRoot } from 'app/pages/notifications/NotificationsRoot'
import { AccountsRoot } from 'app/pages/accounts/AccountsRoot'
import { IdentityRoot } from 'app/pages/identity/IdentityRoot'
import { InvestRoot } from 'app/pages/invest/InvestRoot'
import { AdminRoot } from 'app/pages/admin/AdminRoot'
import { AuthorizerRoot } from 'app/pages/authorizer/AuthorizerRoot'
import { OTCMarketRoot } from 'app/pages/exchange/OTCMarketRoot'
import { FundsManagementRoot } from 'app/pages/fundsManagement/FundsManagementRoot'
import { RedirectToDefaultPage } from 'app/RedirectToDefaultPage'

export const AppRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Accounts' path={AppPath.accounts}>
        <AccountsRoot />
      </AppRoute>

      <AppRoute path={AppPath.educationCentre}>
        <EducationCentreRoot />
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

      <AppRoute breadcrumb='Market' path={AppPath.OTCMarket}>
        <OTCMarketRoot />
      </AppRoute>

      <AppRoute path={AppPath.fundsManagement}>
        <FundsManagementRoot />
      </AppRoute>

      <RedirectToDefaultPage />
    </Switch>
  )
}
