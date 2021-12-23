import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { FundsManagementRoute } from './config'

export const FundsManagementRouter = () => {
  return (
    <Switch>
      <AppRoute path={FundsManagementRoute.dashboard}>
        <div>Fund Management dashboard</div>
      </AppRoute>
    </Switch>
  )
}
