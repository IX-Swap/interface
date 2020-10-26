import { AppFeature, AuthorizerCategory } from 'v2/types/app'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { urlParams } from 'v2/config/urls'
import { DSWithdrawalPreview } from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { WithdrawalPreview } from 'v2/app/components/WithdrawalPreview/WithdrawalPreview'
import { DepositView } from 'v2/app/components/DepositView/DepositView'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'
import { DSOView } from 'v2/app/components/DSO/DSOView'
import { CorporateView } from 'v2/app/pages/identity/components/CorporateView'
import { IndividualView } from 'v2/app/pages/identity/components/IndividualView'

export const authorizerItemMap: Record<
  AuthorizerCategory,
  { uri: string; component: any; paramKey: string }
> = {
  [AppFeature['Bank Accounts']]: {
    uri: '/accounts/banks/list',
    component: BankPreview,
    paramKey: urlParams.bankId
  },
  [AppFeature.Offerings]: {
    uri: '/issuance/dso/list',
    component: DSOView,
    paramKey: urlParams.dsoId
  },
  [AppFeature['Digital Security Withdrawals']]: {
    uri: '/accounts/security/withdrawals',
    component: DSWithdrawalPreview,
    paramKey: urlParams.balanceId
  },
  [AppFeature['Cash Withdrawals']]: {
    uri: '/accounts/cash/withdrawals',
    component: WithdrawalPreview,
    paramKey: urlParams.balanceId
  },
  [AppFeature.Corporates]: {
    uri: '/identity/corporates/list',
    component: CorporateView,
    paramKey: urlParams.identityId
  },
  [AppFeature.Individuals]: {
    uri: '/identity/individuals/list',
    component: IndividualView,
    paramKey: urlParams.identityId
  },
  [AppFeature['Cash Deposits']]: {
    uri: '/accounts/cash/deposits',
    component: DepositView,
    paramKey: urlParams.balanceId
  },
  [AppFeature.Commitments]: {
    uri: '/issuance/commitments/list',
    component: CommitmentPreview,
    paramKey: urlParams.commitmentId
  }
}
