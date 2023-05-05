import { CreateNewTenant } from 'app/pages/admin/pages/tenants/CreateNewTenant'
import { EditTenant } from 'app/pages/admin/pages/tenants/EditTenant'
import { ViewTenant } from 'app/pages/admin/pages/tenants/ViewTenant'
import { Tenants } from 'app/pages/admin/pages/tenants/Tenants'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'

export const TenantRouter = () => {
  return (
    <Switch>
      <AppRoute exact path={AdminRoute.tenants}>
        <Tenants />
      </AppRoute>

      <AppRoute breadcrumb='View Client' path={AdminRoute.viewTenant}>
        <ViewTenant />
      </AppRoute>

      <AppRoute breadcrumb='Edit Client' path={AdminRoute.editTenant}>
        <EditTenant />
      </AppRoute>

      <AppRoute breadcrumb='Create Client' path={AdminRoute.createTenant}>
        <CreateNewTenant />
      </AppRoute>
    </Switch>
  )
}
