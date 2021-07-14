import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch, useLocation } from 'react-router'
import { Users } from 'app/pages/admin/pages/Users'
import { ViewUser } from 'app/pages/admin/pages/ViewUser'

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
    </Switch>
  )
}
