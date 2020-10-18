import { AppFeature, AppService } from 'v2/types/app'

export const urlParams = {
  bankId: ':bankId',
  balanceId: ':balanceId',
  identityId: ':identityId',
  issuerId: ':issuerId',
  dsoId: ':dsoId',
  commitmentId: ':commitmentId',
  itemId: ':itemId',
  tokenId: ':tokenId',
  category: ':category'
}

export const urlAction = {
  create: 'create',
  view: 'view',
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
  notifications: 'notifications'
}

export const urlFeature = {
  bankAccount: `${AppFeature['Bank Accounts']}`,
  balances: 'balances',
  transactions: 'transactions',
  digitalSecurity: 'digital-security',
  individualIdentity: `${AppFeature.Individuals}`,
  corporateIdentity: `${AppFeature.Corporates}`,
  offerings: `${AppFeature.Offerings}`,
  commitments: `${AppFeature.Commitments}`,
  changePassword: 'change-password',
  setup2fa: 'setup-2fa',
  deployments: 'deployments'
}

export const urls = {
  ...urlAction,
  ...urlParams,
  ...urlModule,
  ...urlService,
  ...urlFeature,

  cashDeposit: `${AppFeature['Cash Deposits']}`,
  cashWithdrawal: `${AppFeature['Cash Withdrawals']}`,
  dsDeposit: `${AppFeature['Digital Security Deposits']}`,
  dsWithdrawal: `${AppFeature['Digital Security Withdrawals']}`
}

export const makeURL = (paths: Array<keyof typeof urls>) => {
  return `/${paths.map(path => urls[path]).join('/')}`
}
