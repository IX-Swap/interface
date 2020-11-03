export enum AppService {
  Authentication = 'authentication',
  Accounts = 'accounts',
  Identity = 'identity',
  Issuance = 'issuance',
  Invest = 'invest',
  Authorizer = 'authorizer'
}

export enum AppFeature {
  Authentication = 'logins',
  BankAccounts = 'bank-accounts',
  CashDeposits = 'cash-deposits',
  CashWithdrawals = 'cash-withdrawals',
  DigitalSecurity = 'digital-security',
  DigitalSecurityDeposits = 'digital-security-deposits',
  DigitalSecurityWithdrawals = 'digital-security-withdrawals',
  Corporates = 'corporates',
  Individuals = 'individuals',
  Commitments = 'commitments',
  Offerings = 'offerings',
  Deployments = 'deployments',
  Issuance = 'issuance',
  // backend
  Deposits = 'deposits',
  Withdrawals = 'withdrawals'
}

export enum NotificationFilter {
  Authentication = 'logins',
  BankAccounts = 'bank-accounts',
  Deposits = 'deposits',
  Withdrawals = 'withdrawals',
  DigitalSecurityWithdrawals = 'digital-security-withdrawals',
  Corporates = 'corporates',
  Individuals = 'individuals',
  Commitments = 'commitments',
  Offerings = 'offerings',
  Deployments = 'deployments'
}

export enum AuthorizerCategory {
  BankAccounts = 'bank-accounts',
  CashDeposits = 'cash-deposits',
  CashWithdrawals = 'cash-withdrawals',
  DigitalSecurityWithdrawals = 'digital-security-withdrawals',
  Corporates = 'corporates',
  Individuals = 'individuals',
  Commitments = 'commitments',
  Offerings = 'offerings'
}
