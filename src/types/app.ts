export enum AppService {
  Authentication = 'authentication',
  Accounts = 'accounts',
  Identity = 'identity',
  Issuance = 'issuance',
  IssuanceDetails = 'issuance-details',
  Invest = 'invest',
  Authorizer = 'authorizer',
  OTCMarket = 'otc-market'
}

export enum AppFeature {
  Authentication = 'logins',
  BankAccounts = 'bank-accounts',
  BuyerList = 'buyer-list',
  CashDeposits = 'cash-deposits',
  CashWithdrawals = 'cash-withdrawals',
  DigitalSecurity = 'digital-security',
  DigitalSecurityDeposits = 'digital-security-deposits',
  DigitalSecurityWithdrawals = 'digital-security-withdrawals',
  WithdrawalAddresses = 'withdrawal-addresses',
  Corporates = 'corporates',
  Holdings = 'holdings',
  Individuals = 'individuals',
  IssuanceDetails = 'issuance-details',
  Commitments = 'commitments',
  Market = 'market',
  MyListings = 'my-listings',
  Offerings = 'offerings',
  Deployments = 'deployments',
  Issuance = 'issuance',
  // backend
  Deposits = 'deposits',
  Withdrawals = 'withdrawals',
  Users = 'users'
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
  IssuanceDetails = 'issuance-details',
  Commitments = 'commitments',
  Offerings = 'offerings',
  WithdrawalAddresses = 'withdrawal-addresses'
}
