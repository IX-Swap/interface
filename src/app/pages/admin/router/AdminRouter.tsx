import { AccessReports } from 'app/pages/admin/pages/AccessReports'
import { Users } from 'app/pages/admin/pages/Users'
import { ViewUser } from 'app/pages/admin/pages/ViewUser'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router'

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
    </Switch>
  )
}
