import { AccessReports } from 'app/pages/admin/pages/AccessReports'
import { Users } from 'app/pages/admin/pages/Users'
import { ViewUser } from 'app/pages/admin/pages/ViewUser'
import { AdminRoute } from 'app/pages/admin/router/config'
import { NewAppRoute } from 'components/NewAppRoute'
import React from 'react'
import { Switch } from 'react-router'

export const AdminRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='Users' exact path={AdminRoute.users}>
        <Users />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Access Reports'
        exact
        path={AdminRoute.accessReports}
      >
        <AccessReports />
      </NewAppRoute>

      <NewAppRoute exact path={AdminRoute.view}>
        <ViewUser />
      </NewAppRoute>
    </Switch>
  )
}
