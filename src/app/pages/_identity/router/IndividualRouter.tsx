import React from 'react'
import { NewAppRoute } from 'components/NewAppRoute'
import { Switch } from 'react-router'
import { CreateIndividual } from 'app/pages/_identity/pages/CreateIndividual/CreateIndividual'
import { EditIndividual } from 'app/pages/_identity/pages/EditIndividual/EditIndividual'
import { ViewIndividual } from 'app/pages/_identity/pages/ViewIndividual/ViewIndividual'
import { IdentityRoute } from 'app/pages/_identity/router/config'

export const IndividualRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        breadcrumb='View Individual Investor'
        exact
        path={IdentityRoute.viewIndividual}
      >
        <ViewIndividual />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Create Individual Investor'
        exact
        path={IdentityRoute.createIndividual}
      >
        <CreateIndividual />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Edit Individual Investor'
        exact
        path={IdentityRoute.editIndividual}
      >
        <EditIndividual />
      </NewAppRoute>
    </Switch>
  )
}
