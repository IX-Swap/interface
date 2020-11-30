import { AppFeature } from 'types/app'

export const queryKeys = {
  notifications: 'notifications',
  deployments: 'deployments'
}

export const authorizerQueryKeys = {
  [AppFeature.BankAccounts]: 'authorizer-bank-accounts',
  [AppFeature.CashDeposits]: 'accounts-cash-deposits',
  [AppFeature.CashWithdrawals]: 'accounts-cash-withdrawals',
  [AppFeature.Commitments]: 'issuance-commitments-list',
  [AppFeature.Corporates]: 'identity-corporates-list',
  [AppFeature.Individuals]: 'identity-individuals-list',
  [AppFeature.DigitalSecurityWithdrawals]: 'accounts-security-withdrawals',
  [AppFeature.Offerings]: 'issuance-dso-list'
}
