import { IdentitiesList } from 'app/pages/_identity/pages/IdentitiesList/IdentitiesList'
import React from 'react'
import { Switch } from 'react-router'
import { IdentityRoute } from './config'
import { AppRoute } from 'components/AppRoute'
import { IndividualRouter } from 'app/pages/_identity/router/IndividualRouter'
import { CorporateRouter } from 'app/pages/_identity/router/CorporateRouter'

export const IdentityRouter = () => {
  return (
    <Switch>
      <AppRoute path={IdentityRoute.individual}>
        <IndividualRouter />
      </AppRoute>

      <AppRoute path={IdentityRoute.corporate}>
        <CorporateRouter />
      </AppRoute>

      <AppRoute path={IdentityRoute.list}>
        <IdentitiesList />
      </AppRoute>
    </Switch>
  )
}
