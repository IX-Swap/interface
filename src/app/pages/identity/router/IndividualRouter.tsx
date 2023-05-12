import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router-dom'
import { CreateIndividual } from 'app/pages/identity/pages/CreateIndividual/CreateIndividual'
import { EditIndividual } from 'app/pages/identity/pages/EditIndividual/EditIndividual'
import { ViewIndividual } from 'app/pages/identity/pages/ViewIndividual/ViewIndividual'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { CreateIndividualAccreditation } from '../pages/CreateIndividualAccreditation/CreateIndividualAccreditation'
import { EditIndividualAccreditation } from '../pages/EditIndividualAccreditation/EditIndividualAccreditation'
import { ViewIndividualAccreditation } from '../pages/ViewIndividualAccreditation/ViewIndividualAccreditation'

export const IndividualRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='View Individual Investor Identity'
        exact
        path={IdentityRoute.viewIndividual}
      >
        <ViewIndividual />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Individual Investor Identity'
        exact
        path={IdentityRoute.createIndividual}
      >
        <CreateIndividual />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Individual Investor Identity'
        exact
        path={IdentityRoute.editIndividual}
      >
        <EditIndividual />
      </AppRoute>

      <AppRoute
        breadcrumb='View Individual Investor Accreditation'
        exact
        path={IdentityRoute.viewIndividualAccreditation}
      >
        <ViewIndividualAccreditation />
      </AppRoute>
      <AppRoute
        breadcrumb='Create Individual Investor Accreditation'
        exact
        path={IdentityRoute.createIndividualAccreditation}
      >
        <CreateIndividualAccreditation title='Create Individual Investor Accreditation' />
      </AppRoute>
      <AppRoute
        breadcrumb='Edit Individual Investor Accreditation'
        exact
        path={IdentityRoute.editIndividualAccreditation}
      >
        <EditIndividualAccreditation />
      </AppRoute>
    </Switch>
  )
}
