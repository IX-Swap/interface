import React from 'react'
import { Switch } from 'react-router-dom'
import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { AccessReports } from 'app/pages/admin/pages/AccessReports'
import { adminLandingLinks, AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import { Identities } from 'app/pages/admin/pages/Identities'
import { ViewCorporateIdentity } from 'app/pages/admin/pages/ViewCorporateIdentity'
import { ViewIndividualIdentity } from 'app/pages/admin/pages/ViewIndividualIdentity'
import { VirtualAccounts } from 'app/pages/admin/pages/VirtualAccounts'
import { UserRouter } from 'app/pages/admin/router/UserRouter'
import { MasDisclosure } from 'app/pages/admin/pages/MasDisclosure'
import { Banner } from 'app/pages/admin/pages/Banner'
import { VirtualAccountAudit } from 'app/pages/admin/pages/VirtualAccountAudit'
import { VirtualAccountTransactions } from 'app/pages/admin/pages/VirtualAccountTransactions'
import { BlockchainSettings } from 'app/pages/admin/pages/BlockchainSettings'
import { CustodyManagementRouter } from 'app/pages/admin/router/CustodyManagementRouter'
import { CreateNewTenant } from 'app/pages/admin/pages/tenants/CreateNewTenant'
import { EditTenant } from 'app/pages/admin/pages/tenants/EditTenant'
import { ViewTenant } from 'app/pages/admin/pages/tenants/ViewTenant'
import { Tenants } from 'app/pages/admin/pages/tenants/Tenants'

export const AdminRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Users' path={AdminRoute.users}>
        <UserRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Access Reports'
        exact
        path={AdminRoute.accessReports}
      >
        <AccessReports />
      </AppRoute>

      <AppRoute
        path={AdminRoute.viewIndividualIdentity}
        breadcrumb='View Individual Identity'
      >
        <ViewIndividualIdentity />
      </AppRoute>

      <AppRoute
        path={AdminRoute.viewCorporateIdentity}
        breadcrumb='View Corporate Identity'
      >
        <ViewCorporateIdentity />
      </AppRoute>

      <AppRoute path={AdminRoute.identities} breadcrumb='Identities'>
        <Identities />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.virtualAccount}
        breadcrumb='Virtual Accounts'
      >
        <VirtualAccounts />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.masDisclosure}
        breadcrumb='MAS Disclosure'
      >
        <MasDisclosure />
      </AppRoute>

      <AppRoute path={AdminRoute.banner} breadcrumb='Banner'>
        <Banner />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.virtualAccountTransactions}
        breadcrumb='VA Transactions'
      >
        <VirtualAccountTransactions />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.virtualAccountAudit}
        breadcrumb='VA Audit'
      >
        <VirtualAccountAudit />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.blockchainSettings}
        breadcrumb='Blockchain Settings'
      >
        <BlockchainSettings />
      </AppRoute>

      <AppRoute
        path={AdminRoute.custodyManagement}
        breadcrumb='Custody Management'
      >
        <CustodyManagementRouter />
      </AppRoute>

      <AppRoute
        exact
        path={AdminRoute.createTenant}
        breadcrumb='Create New Tenant'
      >
        <CreateNewTenant />
      </AppRoute>

      <AppRoute exact path={AdminRoute.editTenant} breadcrumb='Edit Tenant'>
        <EditTenant />
      </AppRoute>

      <AppRoute exact path={AdminRoute.viewTenant} breadcrumb='View Tenant'>
        <ViewTenant />
      </AppRoute>

      <AppRoute path={AdminRoute.tenants} breadcrumb='Tenants'>
        <Tenants />
      </AppRoute>

      <AppRoute path={AdminRoute.landing}>
        <LandingPage links={adminLandingLinks} title='Admin' />
      </AppRoute>
    </Switch>
  )
}
