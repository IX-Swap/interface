import { AppFeature, AuthorizerCategory } from 'types/app'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'

export interface AuthorizerMapItem {
  uri: string
  listRoute: string
}

export const authorizerItemMap: Record<
  AuthorizerCategory,
  AuthorizerMapItem
> = {
  [AppFeature.BankAccounts]: {
    uri: '/accounts/banks/list',
    listRoute: AuthorizerRoute.banks
  },
  [AppFeature.Offerings]: {
    uri: '/issuance/dso/list',
    listRoute: AuthorizerRoute.offerings
  },
  [AppFeature.DigitalSecurityWithdrawals]: {
    uri: '/accounts/security/withdrawals',
    listRoute: AuthorizerRoute.dsWithdrawals
  },
  [AppFeature.CashWithdrawals]: {
    uri: '/accounts/cash/withdrawals',
    listRoute: AuthorizerRoute.cashWithdrawals
  },
  [AppFeature.Corporates]: {
    uri: '/identity/corporates/list',
    listRoute: AuthorizerRoute.corporateIdentities
  },
  [AppFeature.IssuanceDetails]: {
    uri: '/identity/issuance-detail/list',
    listRoute: AuthorizerRoute.issuanceDetails
  },
  [AppFeature.Individuals]: {
    uri: '/identity/individuals/list',
    listRoute: AuthorizerRoute.individualIdentities
  },
  [AppFeature.CashDeposits]: {
    uri: '/accounts/cash/deposits',
    listRoute: AuthorizerRoute.cashDeposits
  },
  [AppFeature.Commitments]: {
    uri: '/issuance/commitments/list',
    listRoute: AuthorizerRoute.commitments
  },
  [AppFeature.WithdrawalAddresses]: {
    uri: '/accounts/withdrawal-addresses/list',
    listRoute: AuthorizerRoute.withdrawalAddresses
  }
}
