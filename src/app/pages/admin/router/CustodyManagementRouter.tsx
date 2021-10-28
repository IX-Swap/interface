import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CustodyManagementRoute } from 'app/pages/admin/router/config'
import { CustodyManagement } from 'app/pages/admin/pages/CustodyManagement'
import { CustodyDetailsDialog } from 'app/pages/admin/components/CustodyDetailsDialog/CustodyDetailsDialog'

export const CustodyManagementRouter = () => {
  return (
    <Switch>
      <Route path={CustodyManagementRoute.main}>
        <CustodyManagement />

        <Route path={CustodyManagementRoute.custodyDetails}>
          <CustodyDetailsDialog />
        </Route>
      </Route>
    </Switch>
  )
}
