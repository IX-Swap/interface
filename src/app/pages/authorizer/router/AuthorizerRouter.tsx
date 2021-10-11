import { AuthorizerBanksRouter } from 'app/pages/authorizer/pages/banks/router/AuthorizerBanksRouter'
import { AuthorizerCashWithdrawalsRouter } from 'app/pages/authorizer/pages/cashWithdrawals/router/AuthorizerCashWithdrawalsRouter'
import { AuthorizerCommitmentRouter } from 'app/pages/authorizer/pages/commitments/router/AuthorizerCommitmentRouter'
import { AuthorizerCorporateIdentitiesRouter } from 'app/pages/authorizer/pages/corporateIdentities/router/AuthorizerCorporateIdentitiesRouter'
import { AuthorizerDSWithdrwalsRouter } from 'app/pages/authorizer/pages/dsWithdrawals/router/AuthorizerDSWithdrawalsRouter'
import { AuthorizerIndividualIdentitiesRouter } from 'app/pages/authorizer/pages/individualIdentities/router/AuthorizerIndividualIdentitiesRouter'
import { AuthorizerDSORouter } from 'app/pages/authorizer/pages/offerings/router/AuthorizerDSORouter'
import { AuthorizerWithdrawalAddressesRouter } from 'app/pages/authorizer/pages/withdrawalAddresses/router/AuthorizerWithdrawalAddressesRouter'
import {
  authorizerLandingLinks,
  AuthorizerRoute
} from 'app/pages/authorizer/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router'
import { AuthorizerIssuanceDetailsRouter } from 'app/pages/authorizer/pages/issuanceDetails/router/AuthorizerIssuanceDetailsRouter'
import { AuthorizerListingsRouter } from '../pages/listings/router/AuthorizerListingsRouter'
import { AuthorizerVirtualAccountsRouter } from 'app/pages/authorizer/pages/VirtualAccounts/router/AuthorizerVirtualAccountsRouter'
import { AuthorizerDealClosureRouter } from 'app/pages/authorizer/pages/DealClosures/AuthorizerDealClosuerRouter'
import { AuthorizerLandingPage } from 'app/components/LandingPage/AuthorizerLandingPage'

export const AuthorizerRouter = () => {
  return (
    <Switch>
      <AppRoute breadcrumb='Bank Accounts' path={AuthorizerRoute.banks}>
        <AuthorizerBanksRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Cash Withdrawals'
        path={AuthorizerRoute.cashWithdrawals}
      >
        <AuthorizerCashWithdrawalsRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Digital Security Withdrawals'
        path={AuthorizerRoute.dsWithdrawals}
      >
        <AuthorizerDSWithdrwalsRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Individual Identities'
        path={AuthorizerRoute.individualIdentities}
      >
        <AuthorizerIndividualIdentitiesRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Corporates Identities'
        path={AuthorizerRoute.corporateIdentities}
      >
        <AuthorizerCorporateIdentitiesRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Issuance Offerings'
        path={AuthorizerRoute.offerings}
      >
        <AuthorizerDSORouter />
      </AppRoute>

      <AppRoute breadcrumb='Deal Closure' path={AuthorizerRoute.dealClosure}>
        <AuthorizerDealClosureRouter />
      </AppRoute>

      <AppRoute breadcrumb='Commitments' path={AuthorizerRoute.commitments}>
        <AuthorizerCommitmentRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Withdrawal Addresses'
        path={AuthorizerRoute.withdrawalAddresses}
      >
        <AuthorizerWithdrawalAddressesRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Proposed Fundraising Details'
        path={AuthorizerRoute.issuanceDetails}
      >
        <AuthorizerIssuanceDetailsRouter />
      </AppRoute>

      <AppRoute breadcrumb='Listings' path={AuthorizerRoute.listings}>
        <AuthorizerListingsRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Virtual Accounts'
        path={AuthorizerRoute.virtualAccounts}
      >
        <AuthorizerVirtualAccountsRouter />
      </AppRoute>

      <AppRoute exact path={AuthorizerRoute.landing}>
        <AuthorizerLandingPage
          links={authorizerLandingLinks}
          title='Authorization'
        />
      </AppRoute>
    </Switch>
  )
}
