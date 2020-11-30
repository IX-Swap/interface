import { AppFeature } from 'types/app'

export const apiURL = {
  authorizerBanks: '/accounts/banks/list'
}

export const authorizerURL = {
  [AppFeature.BankAccounts]: '/accounts/banks/list',
  [AppFeature.CashDeposits]: '/accounts/cash/deposits',
  [AppFeature.CashWithdrawals]: '/accounts/cash/withdrawals',
  [AppFeature.Commitments]: '/issuance/commitments/list',
  [AppFeature.Corporates]: '/identity/corporates/list',
  [AppFeature.Individuals]: '/identity/individuals/list',
  [AppFeature.DigitalSecurityWithdrawals]: '/accounts/security/withdrawals',
  [AppFeature.Offerings]: '/issuance/dso/list'
}
