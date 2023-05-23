import React from 'react'
import { AppRoute } from 'components/AppRoute'
import { Switch } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { ViewInvestor } from 'app/pages/identity/pages/ViewInvestor/ViewInvestor'
import { CreateCorporateIdentity } from 'app/pages/identity/pages/CreateInvestor/CreateInvestor'
import { EditInvestor } from 'app/pages/identity/pages/EditInvestor/EditInvestor'
import { CreateCorporateAccreditation } from 'app/pages/identity/pages/CreateCorporateAccreditation/CreateCorporateAccreditation'
import { EditCorporateAccreditation } from 'app/pages/identity/pages/EditCorporateAccreditation/EditCorporateAccreditation'
import { ViewCorporateAccreditation } from 'app/pages/identity/pages/ViewCorporateAccreditation/ViewCorporateAccreditation'

export const CorporateRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='View Corporate KYC'
        exact
        path={IdentityRoute.viewCorporate}
      >
        <ViewInvestor />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Corporate KYC'
        exact
        path={IdentityRoute.createCorporate}
      >
        <CreateCorporateIdentity title='Create Corporate KYC' />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Corporate KYC'
        exact
        path={IdentityRoute.editCorporate}
      >
        <EditInvestor />
      </AppRoute>

      <AppRoute
        breadcrumb='View Corporate Issuer KYC'
        exact
        path={IdentityRoute.viewIssuer}
      >
        <ViewInvestor />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Corporate Issuer'
        exact
        path={IdentityRoute.createIssuer}
      >
        <CreateCorporateIdentity
          type='issuer'
          title='Create Corporate Issuer KYC'
        />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Corporate Issuer'
        exact
        path={IdentityRoute.editIssuer}
      >
        <EditInvestor type='issuer' />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Fund Manager'
        exact
        path={IdentityRoute.createFundManager}
      >
        <CreateCorporateIdentity
          type='Fund Manager'
          title='Create Fund Manager KYC'
        />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Fund Admin'
        exact
        path={IdentityRoute.createFundAdmin}
      >
        <CreateCorporateIdentity
          type='Fund Administrator'
          title='Create Fund Admin KYC'
        />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Portfolio Manager'
        exact
        path={IdentityRoute.createPortfolioManager}
      >
        <CreateCorporateIdentity
          type='Portfolio Manager'
          title='Create Portfolio Manager KYC'
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

      <AppRoute
        breadcrumb='View Corporate Investor Accreditation'
        exact
        path={IdentityRoute.viewCorporateAccreditation}
      >
        <ViewCorporateAccreditation />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Corporate Investor Accreditation'
        exact
        path={IdentityRoute.createCorporateAccreditation}
      >
        <CreateCorporateAccreditation title='Create Corporate Investor Accreditation' />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Corporate Investor Accreditation'
        exact
        path={IdentityRoute.editCorporateAccreditation}
      >
        <EditCorporateAccreditation />
      </AppRoute>
    </Switch>
  )
}
