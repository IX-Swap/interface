import { IdentitiesList } from 'app/pages/identity/pages/IdentitiesList/IdentitiesList'
import React from 'react'
import { Switch } from 'react-router-dom'
import { IdentityRoute } from './config'
import { AppRoute } from 'components/AppRoute'
import { IndividualRouter } from 'app/pages/identity/router/IndividualRouter'
import { CorporateRouter } from 'app/pages/identity/router/CorporateRouter'
import { DetailsOfIssuanceRouter } from 'app/pages/identity/router/DetailsOfIssuanceRouter'
import { RootContainer } from 'ui/RootContainer'

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

      <AppRoute path={IdentityRoute.list}>
        <IdentitiesList />
      </AppRoute>
    </Switch>
  )
}
