import React from 'react'
import { AppRoute as AppPath } from 'app/router/config'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router-dom'
import { IssuanceRoot } from 'app/pages/issuance/IssuanceRoot'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'
import { NotificationsRoot } from 'app/pages/notifications/NotificationsRoot'
import { AccountsRoot } from 'app/pages/accounts/AccountsRoot'
import { IdentityRoot } from 'app/pages/identity/IdentityRoot'
import { InvestRoot } from 'app/pages/invest/InvestRoot'
import { AdminRoot } from 'app/pages/admin/AdminRoot'
import { AuthorizerRoot } from 'app/pages/authorizer/AuthorizerRoot'
import { FundsManagementRoot } from 'app/pages/fundsManagement/FundsManagementRoot'
import { RedirectToDefaultPage } from 'app/RedirectToDefaultPage'
import {
  useIsAdmin,
  useIsAuthorizer,
  useIsFundManager,
  useIsIssuer,
  useIsClient
} from 'helpers/acl'
import { Dashboard } from 'app/pages/dashboard/Dashboard'
import { Feedback } from 'app/pages/feedback/Feedback'
import { ClientRouter } from 'app/pages/admin/router/ClientRouter'

export const AppRouter = () => {
  const isAuthorizer = useIsAuthorizer()
  const isAdmin = useIsAdmin()
  const isIssuer = useIsIssuer()
  const isFundManager = useIsFundManager()
  const isClient = useIsClient()
  const isSuperUser = isAuthorizer || isAdmin

  return (
    <Switch>
      <AppRoute breadcrumb='Dashboard' path={AppPath.dashboard}>
        <Dashboard />
      </AppRoute>

      <AppRoute breadcrumb='Accounts' path={AppPath.accounts}>
        <AccountsRoot />
      </AppRoute>

      <AppRoute breadcrumb='Profile' path={AppPath.identity}>
        <IdentityRoot />
      </AppRoute>

      {/* <AppRoute breadcrumb='Invest' path={AppPath.invest}> */}
      <AppRoute path={AppPath.invest}>
        <InvestRoot />
      </AppRoute>

      <AppRoute path={AppPath.security}>
        <SecurityRoot />
      </AppRoute>

      <AppRoute path={AppPath.notifications}>
        <NotificationsRoot />
      </AppRoute>

      {isClient && (
        <AppRoute breadcrumb='Edit Client Space' path={AppPath.editClientSpace}>
          <ClientRouter />
        </AppRoute>
      )}

      {isIssuer || isSuperUser ? (
        <AppRoute breadcrumb='Issuance' path={AppPath.issuance}>
          <IssuanceRoot />
        </AppRoute>
      ) : null}

      {isAdmin && (
        <AppRoute breadcrumb='Admin' path={AppPath.admin}>
          <AdminRoot />
        </AppRoute>
      )}

      {isFundManager && (
        <AppRoute path={AppPath.fundsManagement}>
          <FundsManagementRoot />
        </AppRoute>
      )}

      {isAuthorizer && (
        <AppRoute breadcrumb='Authorizer' path={AppPath.authorizer}>
          <AuthorizerRoot />
        </AppRoute>
      )}

      <AppRoute path={AppPath.feedback}>
        <Feedback />
      </AppRoute>

      <RedirectToDefaultPage />
    </Switch>
  )
}
