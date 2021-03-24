import { IdentitiesList } from 'app/pages/_identity/pages/IdentitiesList/IdentitiesList'
import React from 'react'
import { Switch } from 'react-router'
import { IdentityRoute } from './config'
import { NewAppRoute } from 'components/NewAppRoute'
import { IndividualRouter } from 'app/pages/_identity/router/IndividualRouter'
import { CorporateRouter } from 'app/pages/_identity/router/CorporateRouter'

export const IdentityRouter = () => {
  return (
    <Switch>
      <NewAppRoute path={IdentityRoute.individual}>
        <IndividualRouter />
      </NewAppRoute>

      <NewAppRoute path={IdentityRoute.corporate}>
        <CorporateRouter />
      </NewAppRoute>

      <NewAppRoute path={IdentityRoute.list}>
        <IdentitiesList />
      </NewAppRoute>
    </Switch>
  )
}
