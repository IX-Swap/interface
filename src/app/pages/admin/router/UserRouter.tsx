import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch, useLocation } from 'react-router'
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
      <AppRoute exact path={AdminRoute.users}>
        <Users />
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
    </Switch>
  )
}
