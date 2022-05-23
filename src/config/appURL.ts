import { AppFeature, AppService } from 'types/app'

export const urlParams = {
  bankId: ':bankId',
  balanceId: ':balanceId',
  identityId: ':identityId',
  issuerId: ':issuerId',
  dsoId: ':dsoId',
  listingId: ':listingId',
  commitmentId: ':commitmentId',
  withdrawalAddressId: ':withdrawalAddressId',
  itemId: ':itemId',
  tokenId: ':tokenId',
  category: ':category',
  userId: ':userId',
  pairId: ':pairId'
}

export const urlAction = {
  create: 'create',
  view: 'view',
  preview: 'preview',
  edit: 'edit',
  deposit: 'deposit',
  withdraw: 'withdraw',
  makeInvestment: 'make-investment'
}

export const urlModule = {
  app: 'app',
  auth: 'auth'
}

export const urlService = {
  account: `${AppService.Accounts}`,
  identity: `${AppService.Identity}`,
  issuance: `${AppService.Issuance}`,
  issuanceDetails: `${AppService.IssuanceDetails}`,
  invest: `${AppService.Invest}`,
  authorizer: `${AppService.Authorizer}`,
  market: `${AppService.Market}`,
  admin: 'admin',
  notifications: 'notifications',
  OTCMarket: `${AppService.OTCMarket}`
}

export const urlFeature = {
  bankAccount: `${AppFeature.BankAccounts}`,
  balances: 'balances',
  transactions: 'transactions',
  digitalSecurity: 'digital-security',
  individualIdentity: `${AppFeature.Individuals}`,
  corporateIdentity: `${AppFeature.Corporates}`,
  offerings: `${AppFeature.Offerings}`,
  overview: 'overview',
  commitments: `${AppFeature.Commitments}`,
  withdrawalAddresses: `${AppFeature.WithdrawalAddresses}`,
  deployments: 'deployments',
  users: AppFeature.Users,
  accessReports: 'access-reports',
  holdings: `${AppFeature.Holdings}`,
  market: `${AppFeature.Market}`,
  myListings: `${AppFeature.MyListings}`,
  listings: `${AppFeature.Listings}`,
  buyerList: `${AppFeature.BuyerList}`,
  captable: AppFeature.CapTable,
  manageDistributions: 'manage-distributions',
  success: 'success'
}

export const appURL = {
  ...urlAction,
  ...urlParams,
  ...urlModule,
  ...urlService,
  ...urlFeature,

  dashboard: `${AppFeature.Dashboard}`,
  cashDeposit: `${AppFeature.CashDeposits}`,
  cashWithdrawal: `${AppFeature.CashWithdrawals}`,
  dsDeposit: `${AppFeature.DigitalSecurityDeposits}`,
  dsWithdrawal: `${AppFeature.DigitalSecurityWithdrawals}`
}

export const makeURL = (paths: Array<keyof typeof appURL>) => {
  return `/${paths.map(path => appURL[path]).join('/')}`
}
