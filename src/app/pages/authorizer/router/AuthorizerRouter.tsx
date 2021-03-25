import { LandingPage } from 'app/components/LandingPage/LandingPage'
import { AuthorizerBanksRouter } from 'app/pages/authorizer/pages/banks/router/AuthorizerBanksRouter'
import { AuthorizerCashDepositsRouter } from 'app/pages/authorizer/pages/cashDeposits/router/AuthorizerCashDepositsRouter'
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
import { NewAppRoute } from 'components/NewAppRoute'
import React from 'react'
import { Switch } from 'react-router'

export const AuthorizerRouter = () => {
  return (
    <Switch>
      <NewAppRoute breadcrumb='Bank Accounts' path={AuthorizerRoute.banks}>
        <AuthorizerBanksRouter />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Cash Deposits'
        path={AuthorizerRoute.cashDeposits}
      >
        <AuthorizerCashDepositsRouter />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Cash Withdrawals'
        path={AuthorizerRoute.cashWithdrawals}
      >
        <AuthorizerCashWithdrawalsRouter />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Digital Security Withdrawals'
        path={AuthorizerRoute.dsWithdrawals}
      >
        <AuthorizerDSWithdrwalsRouter />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Individual Identities'
        path={AuthorizerRoute.individualIdentities}
      >
        <AuthorizerIndividualIdentitiesRouter />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Corporates Identities'
        path={AuthorizerRoute.corporateIdentities}
      >
        <AuthorizerCorporateIdentitiesRouter />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Offerings' path={AuthorizerRoute.offerings}>
        <AuthorizerDSORouter />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Commitments' path={AuthorizerRoute.commitments}>
        <AuthorizerCommitmentRouter />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Withdrawal Addresses'
        path={AuthorizerRoute.withdrawalAddresses}
      >
        <AuthorizerWithdrawalAddressesRouter />
      </NewAppRoute>

      <NewAppRoute exact path={AuthorizerRoute.landing}>
        <LandingPage links={authorizerLandingLinks} title='Authorization' />
      </NewAppRoute>
    </Switch>
  )
}
