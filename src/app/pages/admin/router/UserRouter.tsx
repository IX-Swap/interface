import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch, useLocation } from 'react-router-dom'
import { Users } from 'app/pages/admin/pages/Users'
import { ViewUser } from 'app/pages/admin/pages/ViewUser'
import { CreateIndividualAsAdmin } from 'app/pages/admin/pages/CreateIndividualAsAdmin'
import { CreateCorporateAsAdmin } from 'app/pages/admin/pages/CreateCorporateAsAdmin'
import { CreateIssuerAsAdmin } from 'app/pages/admin/pages/CreateIssuerAsAdmin'

export const UserRouter = () => {
  const { state } = useLocation<any>()

  return (
    <Switch>
      <AppRoute
        exact
        path={AdminRoute.view}
        breadcrumb={state?.userId ?? 'View User'}
      >
        <ViewUser />
      </AppRoute>
      <AppRoute path={AdminRoute.users} exact>
        <Users />
      </AppRoute>
      <AppRoute
        exact
        path={AdminRoute.createIndividualIdentity}
        breadcrumb={'Create Individual KYC'}
      >
        <CreateIndividualAsAdmin />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.createCorporateIdentity}
        breadcrumb={'Create Corporate KYC'}
      >
        <CreateCorporateAsAdmin />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.createIssuerIdentity}
        breadcrumb={'Create Issuer KYC'}
      >
        <CreateIssuerAsAdmin />
      </AppRoute>
    </Switch>
  )
}
