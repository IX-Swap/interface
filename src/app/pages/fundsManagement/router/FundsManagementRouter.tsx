import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { FundsManagementRoute } from './config'
import { Dashboard } from 'app/pages/fundsManagement/pages/Dashboard'

export const FundsManagementRouter = () => {
  return (
    <Switch>
      <AppRoute path={FundsManagementRoute.dashboard}>
        <Dashboard />
      </AppRoute>
    </Switch>
  )
}
