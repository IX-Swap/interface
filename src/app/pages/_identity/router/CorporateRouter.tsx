import React from 'react'
import { NewAppRoute } from 'components/NewAppRoute'
import { Switch } from 'react-router'
import { IdentityRoute } from 'app/pages/_identity/router/config'
import { ViewInvestor } from 'app/pages/_identity/pages/ViewInvestor/ViewInvestor'
import { CreateInvestor } from 'app/pages/_identity/pages/CreateInvestor/CreateInvestor'
import { EditInvestor } from 'app/pages/_identity/pages/EditInvestor/EditInvestor'
import { CreateIssuer } from 'app/pages/_identity/pages/CreateIssuer/CreateIssuer'
import { EditIssuer } from 'app/pages/_identity/pages/EditIssuer/EditIssuer'
import { ViewIssuer } from 'app/pages/_identity/pages/ViewIssuer/ViewIssuer'

export const CorporateRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        breadcrumb='View Corporate Investor'
        exact
        path={IdentityRoute.viewCorporate}
      >
        <ViewInvestor />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Create Corporate Investor'
        exact
        path={IdentityRoute.createCorporate}
      >
        <CreateInvestor />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Edit Corporate Investor'
        exact
        path={IdentityRoute.editCorporate}
      >
        <EditInvestor />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='View Corporate Issuer'
        exact
        path={IdentityRoute.viewIssuer}
      >
        <ViewIssuer />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Create Corporate Issuer'
        exact
        path={IdentityRoute.createIssuer}
      >
        <CreateIssuer />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Edit Corporate Issuer'
        exact
        path={IdentityRoute.editIssuer}
      >
        <EditIssuer />
      </NewAppRoute>
    </Switch>
  )
}
