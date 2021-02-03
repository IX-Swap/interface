import { AppFeature, AppService } from 'types/app'

export const urlParams = {
  bankId: ':bankId',
  balanceId: ':balanceId',
  identityId: ':identityId',
  issuerId: ':issuerId',
  dsoId: ':dsoId',
  commitmentId: ':commitmentId',
  withdrawalAddressId: ':withdrawalAddressId',
  itemId: ':itemId',
  tokenId: ':tokenId',
  category: ':category',
  userId: ':userId'
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
  invest: `${AppService.Invest}`,
  authorizer: `${AppService.Authorizer}`,
  settings: 'settings',
  admin: 'admin',
  home: 'home',
  notifications: 'notifications'
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
  changePassword: 'change-password',
  setup2fa: 'setup-2fa',
  deployments: 'deployments',
  users: AppFeature.Users,
  accessReports: 'access-reports',
  guide2fa: 'guide-2fa',
}

export const appURL = {
  ...urlAction,
  ...urlParams,
  ...urlModule,
  ...urlService,
  ...urlFeature,

  cashDeposit: `${AppFeature.CashDeposits}`,
  cashWithdrawal: `${AppFeature.CashWithdrawals}`,
  dsDeposit: `${AppFeature.DigitalSecurityDeposits}`,
  dsWithdrawal: `${AppFeature.DigitalSecurityWithdrawals}`
}

export const makeURL = (paths: Array<keyof typeof appURL>) => {
  return `/${paths.map(path => appURL[path]).join('/')}`
}
