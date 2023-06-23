import { AppFeature, AuthorizerCategory } from 'types/app'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { virtualAccounts } from 'config/apiURL'

export interface AuthorizerMapItem {
  uri: string
  listRoute: string
}

export const authorizerItemMap: Record<AuthorizerCategory, AuthorizerMapItem> =
  {
    [AppFeature.BankAccounts]: {
      uri: '/accounts/banks/list',
      listRoute: AuthorizerRoute.banks
    },
    [AppFeature.Offerings]: {
      uri: '/issuance/dso/list',
      listRoute: AuthorizerRoute.offerings
    },
    [AppFeature.DealClosure]: {
      uri: '/issuance/closure/list',
      listRoute: AuthorizerRoute.dealClosure
    },
    [AppFeature.SecurityTokenWithdrawals]: {
      uri: '/accounts/security/withdrawals',
      listRoute: AuthorizerRoute.dsWithdrawals
    },
    [AppFeature.CashWithdrawals]: {
      uri: '/accounts/cash/withdrawals',
      listRoute: AuthorizerRoute.cashWithdrawals
    },
    [AppFeature.CorporatesAccreditation]: {
      //   uri: '/identity/corporate/accreditation/list',
      //   listRoute: AuthorizerRoute.corporateAccreditations
      uri: '/identity/corporates/list',
      listRoute: AuthorizerRoute.corporateIdentities
    },
    [AppFeature.Corporates]: {
      uri: '/identity/corporates/list',
      listRoute: AuthorizerRoute.corporateIdentities
    },
    [AppFeature.Corporates + '/role']: {
      uri: '/identity/corporates/list',
      listRoute: AuthorizerRoute.corporateIdentities
    },
    [AppFeature.IssuanceDetails]: {
      uri: '/identity/issuance-detail/list',
      listRoute: AuthorizerRoute.issuanceDetails
    },
    [AppFeature.IndividualsAccreditation]: {
      //   uri: '/identity/individual/accreditation/list',
      //   listRoute: AuthorizerRoute.individualAccreditations
      uri: '/identity/individuals/list',
      listRoute: AuthorizerRoute.individualIdentities
    },
    [AppFeature.Individuals]: {
      uri: '/identity/individuals/list',
      listRoute: AuthorizerRoute.individualIdentities
    },
    [AppFeature.Commitments]: {
      uri: '/issuance/commitments/list',
      listRoute: AuthorizerRoute.commitments
    },
    [AppFeature.WithdrawalAddresses]: {
      uri: '/accounts/withdrawal-addresses/list',
      listRoute: AuthorizerRoute.withdrawalAddresses
    },
    [AppFeature.Listings]: {
      uri: '/exchange/listing/list',
      listRoute: AuthorizerRoute.listings
    },
    [AppFeature.VirtualAccounts]: {
      uri: virtualAccounts.getAll,
      listRoute: AuthorizerRoute.virtualAccounts
    },
    [AppFeature.TokenDeployment]: {
      uri: '/issuance/dso/list',
      listRoute: AuthorizerRoute.tokenDeployment
    }
  }