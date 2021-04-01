import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router'
import { CreateIndividual } from 'app/pages/_identity/pages/CreateIndividual/CreateIndividual'
import { EditIndividual } from 'app/pages/_identity/pages/EditIndividual/EditIndividual'
import { ViewIndividual } from 'app/pages/_identity/pages/ViewIndividual/ViewIndividual'
import { IdentityRoute } from 'app/pages/_identity/router/config'

export const IndividualRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='View Individual Investor'
        exact
        path={IdentityRoute.viewIndividual}
      >
        <ViewIndividual />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Individual Investor'
        exact
        path={IdentityRoute.createIndividual}
      >
        <CreateIndividual />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Individual Investor'
        exact
        path={IdentityRoute.editIndividual}
      >
        <EditIndividual />
      </AppRoute>
    </Switch>
  )
}
