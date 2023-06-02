export enum AppService {
  Authentication = 'authentication',
  Accounts = 'accounts',
  Identity = 'profile',
  Issuance = 'issuance',
  IssuanceDetails = 'issuance-details',
  Invest = 'invest',
  Authorizer = 'authorizer',
  Market = 'market',
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
  SecurityTokenWithdrawals = 'security-token-withdrawals',
  WithdrawalAddresses = 'blockchain-addresses',
  Corporates = 'corporates',
  CorporatesAccreditation = 'corporates/accreditation',
  Holdings = 'holdings',
  Individuals = 'individuals',
  IndividualsAccreditation = 'individuals/accreditation',
  IssuanceDetails = 'issuance-details',
  Commitments = 'commitments',
  Market = 'market',
  Offerings = 'offerings',
  Deployments = 'deployments',
  Issuance = 'issuance',
  Listings = 'listings',
  // backend
  Deposits = 'deposits',
  Withdrawals = 'withdrawals',
  Users = 'users',
  VirtualAccounts = 'virtual-accounts',
  CapTable = 'captable',
  DealClosure = 'closure',
  TokenDeployment = 'token-deployment',
  CustodyManagement = 'custody-management',
  Dashboard = 'dashboard',
  Trading = 'trading'
}

export enum NotificationFilterFeatures {
  Authentication = 'logins',
  BankAccounts = 'bank-accounts',
  Deposits = 'deposits',
  Withdrawals = 'withdrawals',
  SecurityTokenWithdrawals = 'security-token-withdrawals',
  Corporates = 'corporates',
  CorporatesAccreditation = 'corporates/accreditation',
  Individuals = 'individuals',
  IndividualsAccreditation = 'individuals/accreditation',
  Commitments = 'commitments',
  Offerings = 'offerings',
  Deployments = 'deployments',
  IssuanceDetails = 'issuance-details'
}

export enum NotificationFilterFeaturesIssuer {
  BankAccounts = 'bank-accounts',
  Deposits = 'deposits',
  Withdrawals = 'withdrawals',
  SecurityTokenWithdrawals = 'security-token-withdrawals',
  Corporates = 'corporates',
  CorporatesAccreditation = 'corporates/accreditation',
  Deployments = 'deployments'
}

export enum NotificationFilterInvestor {
  BankAccounts = 'bank-accounts',
  Deposits = 'deposits',
  Withdrawals = 'withdrawals',
  Commitments = 'commitments',
  Offerings = 'offerings'
}

export enum AuthorizerCategory {
  BankAccounts = 'bank-accounts',
  CashWithdrawals = 'cash-withdrawals',
  SecurityTokenWithdrawals = 'security-token-withdrawals',
  Corporates = 'corporates',
  CorporatesAccreditation = 'corporates/accreditation',
  Individuals = 'individuals',
  IndividualsAccreditation = 'individuals/accreditation',
  IssuanceDetails = 'issuance-details',
  Commitments = 'commitments',
  Offerings = 'offerings',
  WithdrawalAddresses = 'blockchain-addresses',
  Listings = 'listings',
  VirtualAccounts = 'virtual-accounts',
  DealClosure = 'closure',
  TokenDeployment = 'token-deployment',
  Trading = 'trading'
}

export const RoleSidebarMapping: any = {
  admin: NotificationFilterFeatures,
  authorizer: NotificationFilterFeatures,
  issuer: NotificationFilterFeaturesIssuer,
  investor: NotificationFilterInvestor
}