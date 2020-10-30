import { AppFeature, AuthorizerCategory } from 'v2/types/app'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { urlParams } from 'v2/config/appURL'
import { DSWithdrawalPreview } from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { WithdrawalPreview } from 'v2/app/components/WithdrawalPreview/WithdrawalPreview'
import { DepositView } from 'v2/app/components/DepositView/DepositView'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'
import { DSOView } from 'v2/app/components/DSO/DSOView'
import { CorporateView } from 'v2/app/pages/identity/components/CorporateView'
import { IndividualView } from 'v2/app/pages/identity/components/IndividualView'
import { AuthorizerRoute } from 'v2/app/pages/authorizer/router'

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
  }
}
