import { AuthorizerBanksRouter } from 'app/pages/authorizer/pages/banks/router/AuthorizerBanksRouter'
import { AuthorizerCashWithdrawalsRouter } from 'app/pages/authorizer/pages/cashWithdrawals/router/AuthorizerCashWithdrawalsRouter'
import { AuthorizerCommitmentRouter } from 'app/pages/authorizer/pages/commitments/router/AuthorizerCommitmentRouter'
import { AuthorizerCorporateIdentitiesRouter } from 'app/pages/authorizer/pages/corporateIdentities/router/AuthorizerCorporateIdentitiesRouter'
// import { AuthorizerCorporateAccreditationsRouter } from 'app/pages/authorizer/pages/corporateAccreditations/router/AuthorizerCorporateAccreditationsRouter'
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
import { Switch } from 'react-router-dom'
import { AuthorizerIssuanceDetailsRouter } from 'app/pages/authorizer/pages/issuanceDetails/router/AuthorizerIssuanceDetailsRouter'
import { AuthorizerListingsRouter } from '../pages/listings/router/AuthorizerListingsRouter'
import { AuthorizerVirtualAccountsRouter } from 'app/pages/authorizer/pages/VirtualAccounts/router/AuthorizerVirtualAccountsRouter'
import { AuthorizerDealClosureRouter } from 'app/pages/authorizer/pages/DealClosures/AuthorizerDealClosuerRouter'
import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { TokenDeploymentRouter } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeploymentRouter'
import { OTCTrades } from '../pages/otcTrades/OTCTrades'
// import { AuthorizerIndividualAccreditationsRouter } from 'app/pages/authorizer/pages/individualAccreditations/router/AuthorizerIndividualAccreditationsRouter'

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
        breadcrumb='Security Token Withdrawals'
        path={AuthorizerRoute.dsWithdrawals}
      >
        <AuthorizerDSWithdrwalsRouter />
      </AppRoute>
      {/* <AppRoute
        breadcrumb='Individual Accreditation Applications'
        path={AuthorizerRoute.individualAccreditations}
      >
        <AuthorizerIndividualAccreditationsRouter />
      </AppRoute> */}
      <AppRoute
        breadcrumb='Individual Investor Applications'
        path={AuthorizerRoute.individualIdentities}
      >
        <AuthorizerIndividualIdentitiesRouter />
      </AppRoute>
      {/* <AppRoute
        breadcrumb='Corporate Accreditation Applications'
        path={AuthorizerRoute.corporateAccreditations}
      >
        <AuthorizerCorporateAccreditationsRouter />
      </AppRoute> */}
      <AppRoute
        breadcrumb='Corporate Investor Applications'
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
      <AppRoute breadcrumb='OTC Trades' path={AuthorizerRoute.otcTrades}>
        <OTCTrades />
      </AppRoute>
      <AppRoute breadcrumb='Commitments' path={AuthorizerRoute.commitments}>
        <AuthorizerCommitmentRouter />
      </AppRoute>

      <AppRoute
        breadcrumb='Wallet Addresses'
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

      <AppRoute
        breadcrumb='Token Deployment'
        path={AuthorizerRoute.tokenDeployment}
      >
        <TokenDeploymentRouter />
      </AppRoute>

      <AppRoute path={AuthorizerRoute.landing}>
        <LandingPage links={authorizerLandingLinks} title='Authorizer' />
      </AppRoute>
    </Switch>
  )
}
