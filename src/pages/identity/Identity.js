import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdentityDashboard from './pages/identity-dashboard/IdentityDashboard'

export default function Identity () {
  return (
    <Switch>
      <Route path='/app/identity' exact component={IdentityDashboard} />
    </Switch>
  )
}
