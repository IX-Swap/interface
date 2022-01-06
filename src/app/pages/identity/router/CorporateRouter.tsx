import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { ViewInvestor } from 'app/pages/identity/pages/ViewInvestor/ViewInvestor'
import { CreateInvestor } from 'app/pages/identity/pages/CreateInvestor/CreateInvestor'
import { EditInvestor } from 'app/pages/identity/pages/EditInvestor/EditInvestor'
import { CreateIssuer } from 'app/pages/identity/pages/CreateIssuer/CreateIssuer'
import { EditIssuer } from 'app/pages/identity/pages/EditIssuer/EditIssuer'
import { ViewIssuer } from 'app/pages/identity/pages/ViewIssuer/ViewIssuer'

export const CorporateRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='View Corporate Investor'
        exact
        path={IdentityRoute.viewCorporate}
      >
        <ViewInvestor />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Corporate Investor'
        exact
        path={IdentityRoute.createCorporate}
      >
        <CreateInvestor />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Corporate Investor'
        exact
        path={IdentityRoute.editCorporate}
      >
        <EditInvestor />
      </AppRoute>

      <AppRoute
        breadcrumb='View Corporate Issuer'
        exact
        path={IdentityRoute.viewIssuer}
      >
        <ViewIssuer />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Corporate Issuer'
        exact
        path={IdentityRoute.createIssuer}
      >
        <CreateIssuer />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Corporate Issuer'
        exact
        path={IdentityRoute.editIssuer}
      >
        <EditIssuer />
      </AppRoute>
    </Switch>
  )
}
