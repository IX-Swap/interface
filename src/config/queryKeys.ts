import { AppFeature } from 'types/app'

const generateQueryKey = (prefix?: string, ...params: any[]) => {
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

export const bannersQueryKeys = {
  getById: 'banner-by-id',
  getBannersList: 'banners-list'
}

export const assetsQueryKeys = {
  getById: 'asset-by-id',
  getData: 'assets',
  getAssetsList: 'assets-list'
}

export const identityQueryKeys = {
  getIndividual: 'individual-identity',
  getCorporate: (userId?: string, identityId?: string) => [
    'corporate-identity',
    userId,
    identityId
  ],
  getAllCorporate: 'all-corporate-identities',
  getAllCorporateByUserId: (id?: string) =>
    generateQueryKey('all-corporate-identities', id),
  getDetailsOfIssuance: (userId?: string) =>
    generateQueryKey('details-of-issuance', userId),
  getStats: 'admin-identity-stats',
  getAdminIdentityList: 'admin-identity-list'
}

export const balanceQueryKeys = {
  getAll: 'all-balances',
  getByAssetId: 'balances-by-asset-id',
  getByType: 'balances-by-type',
  getByUserId: (id?: string) => generateQueryKey('balance', id),
  getDistribution: (dsoId?: string) => generateQueryKey('distributions', dsoId)
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
  getClosureList: 'authorizer-closure-list',
  getWithdrawalAddresses: 'authorizer-withdrawal-addresses-list',
  getVirtualAccounts: 'authorizer-virtual-accounts',
  getVirtualAccountById: (id?: string) =>
    generateQueryKey('authorizer-virtual-account', id)
}

export const homeQueryKeys = {
  getAccessReports: 'access-reports',
  getAtlasOneAccessReports: 'atlas-one-access-reports',
  getNewsList: 'news-list',
  getTopIssuers: 'top-issuers',
  getTopCoporates: 'top-corporate'
}

export const banksQueryKeys = {
  getById: 'bank-by-id',
  getData: 'banks',
  getListByUserId: (id?: string) => generateQueryKey('banks', id)
}

export const cashDepositsQueryKeys = {
  getByUserId: (id?: string) => generateQueryKey('cash-deposit', id),
  getByVirtualAccount: (virtualAccountNumber?: string) =>
    generateQueryKey('cash-deposit', virtualAccountNumber)
}

export const cashWithdrawalsQueryKeys = {
  getByUserId: (id?: string) => generateQueryKey('cash-withdrawal', id),
  getByVirtualAccount: (virtualAccountNumber?: string) =>
    generateQueryKey('cash-withdrawal', virtualAccountNumber)
}

export const digitalSecuritiesQueryKeys = {
  getDepositByUserId: (id?: string) => generateQueryKey('ds-deposits', id),
  getWithdrawalsByUserId: (id?: string) =>
    generateQueryKey('ds-withdrawals', id),
  getByUserId: (id?: string) => generateQueryKey('ds', id),
  custody: (userId?: string) => generateQueryKey('custody', userId),
  selfCustody: (userId?: string) => generateQueryKey('self-custody', userId)
}

export const transactionsQueryKeys = {
  getByUserId: (id?: string) => generateQueryKey('transactions', id)
}

export const withdrawalAddressQueryKeys = {
  getAddressById: 'withdrawal-address',
  getAllNetworks: 'all-networks',
  getAddresses: 'withdrawal-addresses',
  getByUserId: (id?: string) => generateQueryKey('withdrawal-addresses', id)
}

export const usersQueryKeys = {
  getList: 'user-list',
  getUserById: (id?: string) => generateQueryKey('user', id),
  getCustomFields: (service?: string, feature?: string) =>
    generateQueryKey('customf-fields', service, feature)
}

export const investQueryKeys = {
  getCommitmentById: 'commitment-by-id',
  getDSOById: (dsoId?: string, issuerId?: string) =>
    generateQueryKey('dso', dsoId, issuerId),
  getCommitmentsByUserId: (id?: string) => generateQueryKey('commitments', id)
}

export const authQueryKeys = {
  get2fa: 'get-2fa',
  getEmailCode: 'get-email-code',
  getLoginHistory: (userId?: string) =>
    generateQueryKey('login-history', userId)
}

export const dsoQueryKeys = {
  getList: 'dso-list',
  getDSOsByUserId: (userId?: string) => generateQueryKey('dso-list', userId),
  getDSOsById: (id?: string) => generateQueryKey('dso-list', id),
  getCapitalStructureList: 'capital-structures-list',
  getPromoted: 'promoted-dsos',
  getApprovedList: 'dso-approved-list',
  getCommitmentsListByDSOId: (dsoId?: string) =>
    generateQueryKey('commitments-list', dsoId),
  closure: (closureId?: string) => generateQueryKey('closure', closureId),
  vccDSOList: (corporateId?: string, status?: string) =>
    generateQueryKey('vcc-dso-list', corporateId, status),
  vccSubFundStats: (corporateId?: string, status?: string, dsos?: string) =>
    generateQueryKey('vcc-subfund-stats', corporateId, status, dsos),
  vccSubFundInvestmentStats: (
    corporateId?: string,
    status?: string,
    dsos?: string
  ) =>
    generateQueryKey('vcc-subfund-investment-stats', corporateId, status, dsos)
}

export const otcQueryKeys = {
  getApprovedListingsList: 'otc-approved-listings-list'
}

export const issuanceQueryKeys = {
  commitmentsStats: (dsoId?: string) =>
    generateQueryKey('commitment-stats', dsoId),
  investmentGrowth: (dsoId?: string) =>
    generateQueryKey('investment-growth', dsoId),
  investorsByCountry: (dsoId?: string) =>
    generateQueryKey('investors-by-country', dsoId),
  totalInvestors: (dsoId?: string) =>
    generateQueryKey('total-investors', dsoId),
  topInvestors: (dsoId?: string) => generateQueryKey('top-investors', dsoId),
  getPromoted: 'promoted-dsos',
  getApprovedList: 'approved-list',
  getCapitalStructureList: 'capital-structures-list',
  getActivitiesList: (dsoId?: string) =>
    generateQueryKey('activities-list', dsoId),
  getReport: (reportId?: string) => generateQueryKey('report', reportId),
  reportTemplate: 'report-template'
}

export const virtualAccountQueryKeys = {
  listAssigned: 'assigned-virtual-accounts',
  listUnassigned: 'unassigned-virtual-accounts',
  getByUserId: 'virtual-account',
  paymentMethod: 'payment-method',
  getBalances: 'get-balances',
  getPortfolios: 'get-portfolios'
}

export const reportsQueryKeys = {
  getAccountInfo: 'get-account-info',
  getActivitySummary: 'get-activity-summary',
  getTradeConfirmation: 'get-trade-confirmation',
  getFeeAndCharges: 'get-fee-and-charges',
  getDividends: 'get-dividends'
}

export const exchange = {
  marketList: 'market-list',
  tokenBalance: 'tokenBalance',
  tradeHistory: 'trade-history',
  myTradeHistory: 'my-trade-history',
  orderBook: 'order-book',
  lastPrice: 'last-price',
  summary: 'summary',
  getMetrics: (tokenId?: string) => generateQueryKey('metrics', tokenId),
  userTrades: (userId?: string) => generateQueryKey('user-trades', userId),
  userOrders: (userId?: string) => generateQueryKey('user-orders', userId),
  userHoldings: (userId?: string) => generateQueryKey('user-holdings', userId),
  listing: (listingId?: string) => generateQueryKey('listing', listingId),
  market: (pairId?: string) => generateQueryKey('market', pairId)
}

export const exchangeMarketQueryKeys = {
  getOrdersList: (userId?: string, pairId?: string) =>
    generateQueryKey('orders-list', userId, pairId)
}

export const tradingQueryKeys = {
  getMyOpenOrdersList: (userId?: string, pairId?: string) =>
    generateQueryKey('my-trading-open-orders-list', userId, pairId)
}

export const listingsQueryKeys = {
  getListingsList: 'listings-list'
}

export const exchangeListingsQueryKeys = {
  getListingById: (listingId?: string, issuerId?: string) =>
    generateQueryKey('listing', listingId, issuerId)
}

export const atlasOneQueryKeys = {
  getSecurities: 'atlas-one-securities'
}

export const resourcesQueryKeys = {
  getSiteConfig: 'site-config',
  exchangeRules: 'exchange-rules'
}

export const virtualAccountsAuditQueryKeys = {
  getMT940Files: 'get-mt940-files',
  getMT942Files: 'get-mt942-files',
  getOutboundFiles: 'get-outbound-files'
}

export const virtualTransactionsQueryKeys = {
  getTransactions: 'get-transactions'
}

export const custodyAccountsQueryKeys = {
  getList: 'custody-accounts-list',
  getCustodianDetails: 'get-custodian-details',
  getCustodiansCount: 'get-custodians-count'
}
