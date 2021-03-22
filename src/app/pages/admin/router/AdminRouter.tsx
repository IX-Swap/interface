import { AccessReports } from 'app/pages/admin/pages/AccessReports'
import { Users } from 'app/pages/admin/pages/Users'
import { ViewUser } from 'app/pages/admin/pages/ViewUser'
import { AdminRoute } from 'app/pages/admin/router/config'
import React from 'react'
import { Route, Switch } from 'react-router'

export const AdminRouter = () => {
  return (
    <Switch>
      <Route exact path={AdminRoute.users}>
        <Users />
      </Route>
      <Route exact path={AdminRoute.accessReports}>
        <AccessReports />
      </Route>
      <Route exact path={AdminRoute.view}>
        <ViewUser />
      </Route>
    </Switch>
  )
}
