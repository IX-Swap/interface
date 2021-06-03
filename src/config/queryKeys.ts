import { AppFeature } from 'types/app'

const generateQueryKey = (prefix: string, ...params: any[]) => {
  return [prefix, ...params].join('-')
}

export const queryKeys = {
  notifications: 'notifications',
  deployments: 'deployments',
  promo: 'promo'
}

export const documentsQueryKeys = {
  getAll: 'all-documents',
  getById: 'document-by-id'
}

export const assetsQueryKeys = {
  getById: 'asset-by-id',
  getData: 'assets'
}

export const identityQueryKeys = {
  getIndividual: 'individual-identity',
  getCorporate: (userId: string, identityId: string) => [
    'corporate-identity',
    userId,
    identityId
  ],
  getAllCorporate: 'all-corporate-identities',
  getAllCorporateByUserId: (id: string) =>
    generateQueryKey('all-corporate-identities', id),
  getDetailsOfIssuance: (userId: string) =>
    generateQueryKey('details-of-issuance', userId),
  getStats: 'admin-identity-stats',
  getAdminIdentityList: 'admin-identity-list'
}

export const balanceQueryKeys = {
  getAll: 'all-balances',
  getByAssetId: 'balances-by-asset-id',
  getByType: 'balances-by-type',
  getByUserId: (id: string) => generateQueryKey('balance', id)
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

export const homeQueryKeys = {
  getAccessReports: 'access-reports',
  getNewsList: 'news-list',
  getTopIssuers: 'top-issuers',
  getTopCoporates: 'top-corporate'
}

export const banksQueryKeys = {
  getById: 'bank-by-id',
  getData: 'banks',
  getListByUserId: (id: string) => generateQueryKey('banks', id)
}

export const cashDepositsQueryKeys = {
  getByUserId: (id: string) => generateQueryKey('cash-deposits', id),
  getByVirtualAccount: (virtualAccountNumber: string) =>
    generateQueryKey('cash-deposits', virtualAccountNumber)
}

export const cashWithdrawalsQueryKeys = {
  getByUserId: (id: string) => generateQueryKey('cash-withdrawals', id),
  getByVirtualAccount: (virtualAccountNumber: string) =>
    generateQueryKey('cash-deposits', virtualAccountNumber)
}

export const digitalSecuritiesQueryKeys = {
  getDepositByUserId: (id: string) => generateQueryKey('ds-deposits', id),
  getWithdrawalsByUserId: (id: string) =>
    generateQueryKey('ds-withdrawals', id),
  getByUserId: (id: string) => generateQueryKey('ds', id)
}

export const transactionsQueryKeys = {
  getByUserId: (id: string) => generateQueryKey('transactions', id)
}

export const withdrawalAddressQueryKeys = {
  getAddressById: 'withdrawal-address',
  getAllNetworks: 'all-networks',
  getAddresses: 'withdrawal-addresses',
  getByUserId: (id: string) => generateQueryKey('withdrawal-addresses', id)
}

export const usersQueryKeys = {
  getList: 'user-list',
  getUserById: (id: string) => generateQueryKey('user', id),
  getCustomFields: (service: string, feature: string) =>
    generateQueryKey('customf-fields', service, feature)
}

export const investQueryKeys = {
  getCommitmentById: 'commitment-by-id',
  getDSOById: 'dso-by-id',
  getCommitmentsByUserId: (id: string) => generateQueryKey('commitments', id)
}

export const authQueryKeys = {
  get2fa: 'get-2fa',
  getLoginHistory: (userId: string) => generateQueryKey('login-history', userId)
}

export const dsoQueryKeys = {
  getList: 'dso-list',
  getDSOsByUserId: (userId: string) => generateQueryKey('dso-list', userId),
  getDSOsById: (id: string) => generateQueryKey('dso-list', id),
  getCapitalStructureList: 'capital-structures-list',
  getPromoted: 'promoted-dsos',
  getApprovedList: 'dso-approved-list'
}

export const issuanceQueryKeys = {
  commitmentsStats: (dsoId: string) =>
    generateQueryKey('commitment-stats', dsoId),
  investmentGrowth: (dsoId: string) =>
    generateQueryKey('investment-growth', dsoId),
  investorsByCountry: (dsoId: string) =>
    generateQueryKey('investors-by-country', dsoId),
  totalInvestors: (dsoId: string) => generateQueryKey('total-investors', dsoId),
  topInvestors: (dsoId: string) => generateQueryKey('top-investors', dsoId),
  getPromoted: 'promoted-dsos',
  getApprovedList: 'approved-list',
  getCapitalStructureList: 'capital-structures-list',
  getActivitiesList: (dsoId: string) =>
    generateQueryKey('activities-list', dsoId)
}

export const virtualAccountQueryKeys = {
  listAssigned: 'assigned-virtual-accounts',
  listUnassigned: 'unassigned-virtual-accounts',
  getByUserId: 'virtual-account'
}

export const exchange = {
  marketList: 'market-list',
  tradeHistory: 'trade-history',
  myTradeHistory: 'my-trade-history',
  orderBook: 'orderbook',
  lastPrice: 'last-price',
  userTrades: (userId: string) => generateQueryKey('user-trades', userId),
  userOrders: (userId: string) => generateQueryKey('user-orders', userId),
  userHoldings: (userId: string) => generateQueryKey('user-holdings', userId),
  listing: (listingId: string) => generateQueryKey('listing', listingId),
  market: (pairId: string) => generateQueryKey('market', pairId)
}

export const exchangeMarketQueryKeys = {
  getOrdersList: (pairId: string) => generateQueryKey('orders-list', pairId)
}

export const listingsQueryKeys = {
  getListingsList: 'listings-list'
}
