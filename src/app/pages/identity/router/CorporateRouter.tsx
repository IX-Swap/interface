import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { ViewInvestor } from 'app/pages/identity/pages/ViewInvestor/ViewInvestor'
import { CreateCorporateIdentity } from 'app/pages/identity/pages/CreateInvestor/CreateInvestor'
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
        breadcrumb='Create Corporate Investor Identity'
        exact
        path={IdentityRoute.createCorporate}
      >
        <CreateCorporateIdentity title='Create Corporate Investor Identity' />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Corporate Investor Identity'
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

      <AppRoute
        breadcrumb='Create Fund Manager'
        exact
        path={IdentityRoute.createFundManager}
      >
        <CreateCorporateIdentity
          type='Fund Manager'
          title='Create Fund Manager Identity'
        />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Fund Admin'
        exact
        path={IdentityRoute.createFundAdmin}
      >
        <CreateCorporateIdentity
          type='Fund Administrator'
          title='Create Fund Admin Identity'
        />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Portfolio Manager'
        exact
        path={IdentityRoute.createPortfolioManager}
      >
        <CreateCorporateIdentity
          type='Portfolio Manager'
          title='Create Portfolio Manager Identity'
        />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Fund Manager'
        exact
        path={IdentityRoute.editFundManager}
      >
        <EditInvestor type='Fund Manager' />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Fund Admin'
        exact
        path={IdentityRoute.editFundAdmin}
      >
        <EditInvestor type='Fund Administrator' />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Portfolio Manager'
        exact
        path={IdentityRoute.editFundAdmin}
      >
        <EditInvestor type='Portfolio Manager' />
      </AppRoute>

      <AppRoute
        breadcrumb='View Fund Manager'
        exact
        path={IdentityRoute.viewFundManager}
      >
        <ViewInvestor />
      </AppRoute>

      <AppRoute
        breadcrumb='View Fund Administrator'
        exact
        path={IdentityRoute.viewFundAdmin}
      >
        <ViewInvestor />
      </AppRoute>

      <AppRoute
        breadcrumb='View Portofolio Manager'
        exact
        path={IdentityRoute.viewPortfolioManager}
      >
        <ViewInvestor />
      </AppRoute>
    </Switch>
  )
}
