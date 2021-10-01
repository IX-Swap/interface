import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { CommitmentsRoute } from 'app/pages/accounts/pages/commitments/router/config'
import { Commitments } from 'app/pages/accounts/pages/commitments/Commitments'

export const CommitmentsRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Commitments' path={CommitmentsRoute.list}>
        <Commitments />
      </AppRoute>
    </Switch>
  )
}
