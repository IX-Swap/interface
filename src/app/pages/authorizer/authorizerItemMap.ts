import { AppFeature, AuthorizerCategory } from 'types/app'
import { BankPreview } from 'app/components/BankPreview/BankPreview'
import { urlParams } from 'config/appURL'
import { DSWithdrawalPreview } from 'app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { WithdrawalPreview } from 'app/components/WithdrawalPreview/WithdrawalPreview'
import { DepositView } from 'app/components/DepositView/DepositView'
import { WithdrawalAddressPreview } from 'app/components/WithdrawalAddressPreview/WithdrawalAddressPreview'
import { CommitmentPreview } from 'app/components/CommitmentPreview/CommitmentPreview'
import { DSOView } from 'app/components/DSO/DSOView'
import { CorporateView } from 'app/pages/identity/components/CorporateView'
import { IndividualView } from 'app/pages/identity/components/IndividualView'
import { AuthorizerRoute } from 'app/pages/authorizer/router'

export interface AuthorizerMapItem {
  uri: string
  component: any
  paramKey: string
  title: string
  listRoute: keyof typeof AuthorizerRoute
}

export const authorizerItemMap: Record<
  AuthorizerCategory,
  AuthorizerMapItem
> = {
  [AppFeature.BankAccounts]: {
    uri: '/accounts/banks/list',
    component: BankPreview,
    paramKey: urlParams.itemId,
    title: 'Bank Account',
    listRoute: 'banks' as const
  },
  [AppFeature.Offerings]: {
    uri: '/issuance/dso/list',
    component: DSOView,
    paramKey: urlParams.itemId,
    title: 'Digital Security Offering',
    listRoute: 'offerings' as const
  },
  [AppFeature.DigitalSecurityWithdrawals]: {
    uri: '/accounts/security/withdrawals',
    component: DSWithdrawalPreview,
    paramKey: urlParams.itemId,
    title: 'Digital Security Withdrawal',
    listRoute: 'dsWithdrawals' as const
  },
  [AppFeature.CashWithdrawals]: {
    uri: '/accounts/cash/withdrawals',
    component: WithdrawalPreview,
    paramKey: urlParams.itemId,
    title: 'Cash Withdrawal',
    listRoute: 'cashWithdrawals' as const
  },
  [AppFeature.Corporates]: {
    uri: '/identity/corporates/list',
    component: CorporateView,
    paramKey: urlParams.itemId,
    title: 'Corporate Identity',
    listRoute: 'corporateIdentities' as const
  },
  [AppFeature.Individuals]: {
    uri: '/identity/individuals/list',
    component: IndividualView,
    paramKey: urlParams.itemId,
    title: 'Individual Identity',
    listRoute: 'individualIdentities' as const
  },
  [AppFeature.CashDeposits]: {
    uri: '/accounts/cash/deposits',
    component: DepositView,
    paramKey: urlParams.itemId,
    title: 'Cash Deposit',
    listRoute: 'cashDeposits' as const
  },
  [AppFeature.Commitments]: {
    uri: '/issuance/commitments/list',
    component: CommitmentPreview,
    paramKey: urlParams.itemId,
    title: 'Commitment',
    listRoute: 'commitments' as const
  },
  [AppFeature.WithdrawalAddresses]: {
    uri: '/accounts/withdrawal-addresses/list',
    component: WithdrawalAddressPreview,
    paramKey: urlParams.itemId,
    title: 'Withdrawal Address',
    listRoute: 'withdrawalAddresses' as const
  }
}
