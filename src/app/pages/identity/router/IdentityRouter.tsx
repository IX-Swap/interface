import { IdentitiesList } from 'app/pages/identity/pages/IdentitiesList/IdentitiesList'
import { CorporateRouter } from 'app/pages/identity/router/CorporateRouter'
import { DetailsOfIssuanceRouter } from 'app/pages/identity/router/DetailsOfIssuanceRouter'
import { IndividualRouter } from 'app/pages/identity/router/IndividualRouter'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router-dom'
import { IdentityRoute } from './config'
import { SuccessPage } from 'app/pages/identity/pages/SuccessPage/SuccessPage'
import { CreateIndividualAccreditation } from '../pages/CreateIndividualAccreditation/CreateIndividualAccreditation'
import { EditIndividualAccreditation } from '../pages/EditIndividualAccreditation/EditIndividualAccreditation'
import { ViewIndividualAccreditation } from '../pages/ViewIndividualAccreditation/ViewIndividualAccreditation'

export const IdentityRouter = () => {
  return (
    <Switch>
      <AppRoute path={IdentityRoute.individual}>
        <IndividualRouter />
      </AppRoute>

      <AppRoute path={IdentityRoute.corporate}>
        <CorporateRouter />
      </AppRoute>

      <AppRoute path={IdentityRoute.issuance}>
        <DetailsOfIssuanceRouter />
      </AppRoute>

      <AppRoute
        path={IdentityRoute.identitySuccess}
        breadcrumb='Success page'
        exact
      >
        <SuccessPage />
      </AppRoute>
      <AppRoute path={IdentityRoute.list}>
        <IdentitiesList />
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
      <AppRoute
        breadcrumb='View Individual Investor Accreditation'
        exact
        path={IdentityRoute.viewIndividualAccreditation}
      >
        <ViewIndividualAccreditation />
      </AppRoute>
    </Switch>
  )
}
