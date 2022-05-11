// import { IdentitiesList } from 'app/pages/identity/pages/IdentitiesList/IdentitiesList'
import React from 'react'
import { Switch } from 'react-router-dom'
import { IdentityRoute } from './config'
import { AppRoute } from 'components/AppRoute'
import { IndividualRouter } from 'app/pages/identity/router/IndividualRouter'
import { CorporateRouter } from 'app/pages/identity/router/CorporateRouter'
import { DetailsOfIssuanceRouter } from 'app/pages/identity/router/DetailsOfIssuanceRouter'
import { SubmitIdentity } from 'app/pages/identity/components/SubmitIdentity/SubmitIdentity'
import { RootContainer } from 'ui/RootContainer'

export const IdentityRouter = () => {
  return (
    <Switch>
      <AppRoute path={IdentityRoute.individual}>
        <RootContainer>
          <IndividualRouter />
        </RootContainer>
      </AppRoute>

      <AppRoute path={IdentityRoute.corporate}>
        <RootContainer>
          <CorporateRouter />
        </RootContainer>
      </AppRoute>

      <AppRoute path={IdentityRoute.issuance}>
        <RootContainer>
          <DetailsOfIssuanceRouter />
        </RootContainer>
      </AppRoute>

      <AppRoute
        path={IdentityRoute.list}
        breadcrumb='Create Individual Investor'
        exact
      >
        <SubmitIdentity />
      </AppRoute>
    </Switch>
  )
}
