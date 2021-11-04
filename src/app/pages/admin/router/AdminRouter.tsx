import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { AccessReports } from 'app/pages/admin/pages/AccessReports'
import { CreateCorporateAsAdmin } from 'app/pages/admin/pages/CreateCorporateAsAdmin'
import { CreateIndividualAsAdmin } from 'app/pages/admin/pages/CreateIndividualAsAdmin'
import { CreateIssuerAsAdmin } from 'app/pages/admin/pages/CreateIssuerAsAdmin'
import { adminLandingLinks, AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import { Identities } from 'app/pages/admin/pages/Identities'
import { ViewCorporateIdentity } from 'app/pages/admin/pages/ViewCorporateIdentity'
import { ViewIndividualIdentity } from 'app/pages/admin/pages/ViewIndividualIdentity'
import React from 'react'
import { Switch } from 'react-router'
import { VirtualAccounts } from 'app/pages/admin/pages/VirtualAccounts'
import { UserRouter } from 'app/pages/admin/router/UserRouter'
import { MasDisclosure } from 'app/pages/admin/pages/MasDisclosure'
import { Banner } from 'app/pages/admin/pages/Banner'
import { VirtualAccountAudit } from 'app/pages/admin/pages/VirtualAccountAudit'
import { VirtualAccountTransactions } from 'app/pages/admin/pages/VirtualAccountTransactions'
import { BlockchainSettings } from 'app/pages/admin/pages/BlockchainSettings'
import { RootContainer } from 'ui/RootContainer'
import { privateClassNames } from 'helpers/classnames'

export const AdminRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Users' path={AdminRoute.users}>
        <RootContainer className={privateClassNames()}>
          <UserRouter />
        </RootContainer>
      </AppRoute>

      <AppRoute
        breadcrumb='Access Reports'
        exact
        path={AdminRoute.accessReports}
      >
        <RootContainer className={privateClassNames()}>
          <AccessReports />
        </RootContainer>
      </AppRoute>

      <AppRoute exact path={AdminRoute.createIndividualIdentity}>
        <RootContainer className={privateClassNames()}>
          <CreateIndividualAsAdmin />
        </RootContainer>
      </AppRoute>

      <AppRoute exact path={AdminRoute.createCorporateIdentity}>
        <RootContainer className={privateClassNames()}>
          <CreateCorporateAsAdmin />
        </RootContainer>
      </AppRoute>

      <AppRoute exact path={AdminRoute.createIssuerIdentity}>
        <RootContainer className={privateClassNames()}>
          <CreateIssuerAsAdmin />
        </RootContainer>
      </AppRoute>

      <AppRoute
        path={AdminRoute.viewIndividualIdentity}
        breadcrumb='View Individual Identity'
      >
        <RootContainer className={privateClassNames()}>
          <ViewIndividualIdentity />
        </RootContainer>
      </AppRoute>

      <AppRoute
        path={AdminRoute.viewCorporateIdentity}
        breadcrumb='View Corporate Identity'
      >
        <RootContainer className={privateClassNames()}>
          <ViewCorporateIdentity />
        </RootContainer>
      </AppRoute>

      <AppRoute path={AdminRoute.identities} breadcrumb='Identities'>
        <RootContainer className={privateClassNames()}>
          <Identities />
        </RootContainer>
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.virtualAccount}
        breadcrumb='Virtual Accounts'
      >
        <RootContainer className={privateClassNames()}>
          <VirtualAccounts />
        </RootContainer>
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.masDisclosure}
        breadcrumb='MAS Disclosure'
      >
        <RootContainer className={privateClassNames()}>
          <MasDisclosure />
        </RootContainer>
      </AppRoute>

      <AppRoute exact path={AdminRoute.banner} breadcrumb='Banner'>
        <RootContainer className={privateClassNames()}>
          <Banner />
        </RootContainer>
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.virtualAccountTransactions}
        breadcrumb='VA Transactions'
      >
        <RootContainer className={privateClassNames()}>
          <VirtualAccountTransactions />
        </RootContainer>
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.virtualAccountAudit}
        breadcrumb='VA Audit'
      >
        <RootContainer className={privateClassNames()}>
          <VirtualAccountAudit />
        </RootContainer>
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.blockchainSettings}
        breadcrumb='Blockchain Settings'
      >
        <BlockchainSettings />
      </AppRoute>

      <AppRoute exact path={AdminRoute.landing}>
        <RootContainer className={privateClassNames()}>
          <LandingPage links={adminLandingLinks} title='Admin' />
        </RootContainer>
      </AppRoute>
    </Switch>
  )
}
