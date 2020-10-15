import { AppFeature, AuthorizerCategory } from 'v2/types/app'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { urlParams } from 'v2/config/urls'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { DSWithdrawalPreview } from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { WithdrawalPreview } from 'v2/app/components/WithdrawalPreview/WithdrawalPreview'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { DepositView } from 'v2/app/components/DepositView/DepositView'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'

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
    component: DSOForm,
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
    component: CorporateIdentityForm,
    paramKey: urlParams.identityId
  },
  [AppFeature.Individuals]: {
    uri: '/identity/individuals/list',
    component: IndividualIdentityForm,
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
