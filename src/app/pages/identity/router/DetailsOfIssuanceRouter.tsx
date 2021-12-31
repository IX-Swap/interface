import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router-dom'
import { CreateDetailsOfIssuance } from 'app/pages/identity/pages/CreateDetailsOfIssuance/CreateDetailsOfIssuance'
import { IdentityRoute } from 'app/pages/identity/router/config'

export const DetailsOfIssuanceRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='Create Details of Issuance'
        exact
        path={IdentityRoute.createDetailsOfIssuance}
      >
        <CreateDetailsOfIssuance />
      </AppRoute>
    </Switch>
  )
}
