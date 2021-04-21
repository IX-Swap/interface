import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { AccessReports } from 'app/pages/admin/pages/AccessReports'
import { CreateCorporateAsAdmin } from 'app/pages/admin/pages/CreateCorporateAsAdmin'
import { CreateIndividualAsAdmin } from 'app/pages/admin/pages/CreateIndividualAsAdmin'
import { CreateIssuerAsAdmin } from 'app/pages/admin/pages/CreateIssuerAsAdmin'
import { Identities } from 'app/pages/admin/pages/Identities'
import { Users } from 'app/pages/admin/pages/Users'
import { ViewUser } from 'app/pages/admin/pages/ViewUser'
import { adminLandingLinks, AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router'
import { VirtualAccounts } from 'app/pages/admin/pages/VirtualAccounts'

export const AdminRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Users' exact path={AdminRoute.users}>
        <Users />
      </AppRoute>

      <AppRoute
        breadcrumb='Access Reports'
        exact
        path={AdminRoute.accessReports}
      >
        <AccessReports />
      </AppRoute>

      <AppRoute exact path={AdminRoute.view}>
        <ViewUser />
      </AppRoute>

      <AppRoute exact path={AdminRoute.createIndividualIdentity}>
        <CreateIndividualAsAdmin />
      </AppRoute>

      <AppRoute exact path={AdminRoute.createCorporateIdentity}>
        <CreateCorporateAsAdmin />
      </AppRoute>

      <AppRoute exact path={AdminRoute.createIssuerIdentity}>
        <CreateIssuerAsAdmin />
      </AppRoute>

      <AppRoute exact path={AdminRoute.identities} breadcrumb='Identities'>
        <Identities />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.virtualAccount}
        breadcrumb='Virtual Accounts'
      >
        <VirtualAccounts />
      </AppRoute>

      <AppRoute exact path={AdminRoute.landing}>
        <LandingPage links={adminLandingLinks} title='Authorization' />
      </AppRoute>
    </Switch>
  )
}
