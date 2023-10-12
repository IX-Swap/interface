import React from 'react'
import { Switch } from 'react-router-dom'
import { LandingPage } from 'app/components/LandingPage/LandingPage'
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
import { CustodyManagementRouter } from 'app/pages/admin/router/CustodyManagementRouter'
import { TenantRouter } from './TenantRouter'
import { WhitelistWithdrawalAddressesRouter } from './WhitelistWalletAddressesRouter'
import { TokenTransactions } from '../pages/TokenTransactions'

export const AdminRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Users' path={AdminRoute.users}>
        <UserRouter />
      </AppRoute>

      <AppRoute
        path={AdminRoute.viewIndividualIdentity}
        breadcrumb='View Individual KYC'
      >
        <ViewIndividualIdentity />
      </AppRoute>

      <AppRoute
        path={AdminRoute.viewCorporateIdentity}
        breadcrumb='View Corporate KYC'
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

      <AppRoute exact path={AdminRoute.masDisclosure} breadcrumb='Disclosure'>
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
        breadcrumb='Virtual Account Audit'
      >
        <VirtualAccountAudit />
      </AppRoute>

      <AppRoute
        path={AdminRoute.custodyManagement}
        breadcrumb='Custody Management'
      >
        <CustodyManagementRouter />
      </AppRoute>

      <AppRoute breadcrumb='Client Spaces' path={AdminRoute.tenants}>
        <TenantRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Whitelist Wallet Addresses'
        path={AdminRoute.whitelistWalletAddresses}
      >
        <WhitelistWithdrawalAddressesRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Token Transactions'
        path={AdminRoute.tokenTransactions}
      >
        <TokenTransactions />
      </AppRoute>

      <AppRoute path={AdminRoute.landing}>
        <LandingPage links={adminLandingLinks} title='Admin' />
      </AppRoute>
    </Switch>
  )
}
