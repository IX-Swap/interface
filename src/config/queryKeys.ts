import { AppFeature } from 'types/app'

const generateQueryKey = (prefix: string, key: string) => {
  return `${prefix}-${key}`
}

export const queryKeys = {
  notifications: 'notifications',
  deployments: 'deployments',
  
}

export const documents = {
  getAll: 'all-documents',
  getById: 'document-by-id'
}

export const assets = {
  getById: 'asset-by-id',
  getData: 'assets'
}

export const identity = {
  getIndividual: 'individual-identity',
  getAllCorporate: 'all-corporate-identities'
}

export const balance = {
  getAll: 'all-balances',
  getByAssetId: 'balances-by-asset-id',
  getByType: 'balances-by-type',
  getByUserId: (id: string) => generateQueryKey('balance', id),
}

export const authorizerQueryKeys = {
  [AppFeature.BankAccounts]: 'authorizer-bank-accounts',
  [AppFeature.CashDeposits]: 'accounts-cash-deposits',
  [AppFeature.CashWithdrawals]: 'accounts-cash-withdrawals',
  [AppFeature.Commitments]: 'issuance-commitments-list',
  [AppFeature.Corporates]: 'identity-corporates-list',
  [AppFeature.Individuals]: 'identity-individuals-list',
  [AppFeature.DigitalSecurityWithdrawals]: 'accounts-security-withdrawals',
  [AppFeature.Offerings]: 'issuance-dso-list',
  authorizerFilter: 'authorizer-filter',
  getBankList: 'authorizer-banks-list',
  getCashDeposits: 'authorizer-cash-deposits',
  getCashWithdrawals: 'authorizer-cash-withdrawals',
  getCommitmentsList: 'authorizer-commitments-list',
  getCorporateIdentities: 'authorizer-corporate-list',
  getSecurityWithdrawals: 'authorizer-security-withdrawals',
  getIndividualIdentityList: 'authorizer-individual-identitiesList',
  getDSOList: 'authorizer-dso-list',
  getWithdrawalAddresses: 'authorizer-withdrawal-addresses-list'
}

export const banks = {
  getById: 'bank-by-id',
  getData: 'banks',
  getListByUserId: (id: string) => generateQueryKey('banks', id)
}

export const cashDeposits = {
  getByUserId: (id: string) => generateQueryKey('cash-deposits', id),
}

export const cashWithdrawals = {
  getByUserId: (id: string) => generateQueryKey('cash-withdrawals', id)
}

export const digitalSecurities = {
  getDepositByUserId: (id: string) => generateQueryKey('ds-deposits', id),
  getWithdrawalsByUserId: (id: string) => generateQueryKey('ds-withdrawals', id),
  getByUserId: (id: string) => generateQueryKey('ds', id)
}

export const transactions = {
  getByUserId: (id: string) => generateQueryKey('transactions', id)
}

export const withdrawalAddress = {
  getAddressById: 'withdrawal-address',
  getAllNetworks: 'all-networks',
  getAddresses: 'withdrawal-addresses',
  getByUserId: (id: string) => generateQueryKey('withdrawal-addresses', id)
}

export const users = {
  getList: 'user-list'
}

export const invest = {
  getCommitmentById: 'commitment-by-id',
  getDSOById: 'dso-by-id',
  getCommitmentsByUserId: (id: string) => generateQueryKey('commitments', id)
}

export const security = {
  get2fa: 'get-2fa'
}

export const dso = {
  getList: 'dso-list'
}
