import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'
import { EditClient } from '../pages/clientSpace/EditClient'

export const ClientRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Edit Client Space' path={AdminRoute.editTenant}>
        <EditClient />
      </AppRoute>
    </Switch>
  )
}
