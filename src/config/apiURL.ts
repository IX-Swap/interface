/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AppFeature } from 'types/app'
import { OrderType } from 'types/otcOrder'

export const apiURL = {
  authorizerBanks: '/accounts/banks/list'
}

export const homeURL = {
  getNewsList: '/resources/news',
  getTopIssuers: '/issuance/top-issuers',
  getTopCorporates: '/issuance/top-corporates'
}

export const authorizerURL = {
  [AppFeature.BankAccounts]: '/accounts/banks/list',
  [AppFeature.CashDeposits]: '/accounts/cash/deposits',
  [AppFeature.CashWithdrawals]: '/accounts/cash/withdrawals',
  [AppFeature.Commitments]: '/issuance/commitments/list',
  [AppFeature.Corporates]: '/identity/corporates/list',
  [AppFeature.Individuals]: '/identity/individuals/list',
  [AppFeature.SecurityTokenWithdrawals]: '/accounts/security/withdrawals',
  [AppFeature.Offerings]: '/issuance/dso/list',
  bulkAuthorizeCommitments: (action: 'approve' | 'reject') =>
    `/issuance/commitments/${action}`
}

export const identityURL = {
  corporates: {
    getAllBySuperUser: '/identity/corporates/list',
    getAllByUserId: (userId?: string) => `/identity/corporates/${userId}/list`,
    create: (userId?: string) => `/identity/corporates/${userId}`,
    update: (userId?: string, corporateId?: string) =>
      `/identity/corporates/${userId}/${corporateId}`,
    submit: (id?: string) => `/identity/corporates/${id}/submit`,
    get: (userId?: string, identityId?: string) =>
      `/identity/corporates/${userId}/${identityId}`,
    getByUserId: (userId?: string) => `/identity/corporate/${userId}`,
    validateData: '/identity/corporates/check',
    accreditation: {
      create: (corporateId?: string) =>
        `/identity/accreditation/corporate/${corporateId}`,
      update: (corporateId?: string) =>
        `/identity/accreditation/corporate/${corporateId}`,
      submit: (id?: string) => `/identity/accreditation/corporate/${id}/submit`,
      get: (identityId?: string) =>
        `/identity/accreditation/corporate/${identityId}`
    }
  },
  individuals: {
    create: (userId?: string) => `/identity/individuals/${userId}`,
    update: (userId?: string) => `/identity/individuals/${userId}`,
    get: (userId?: string) => `/identity/individuals/${userId}`,
    submit: (id?: string) => `/identity/individuals/${id}/submit`,
    getSingPassData: '/sing-pass/getuser',
    accreditation: {
      create: (individualId?: string) =>
        `/identity/accreditation/individual/${individualId}`,
      update: (individualId?: string) =>
        `/identity/accreditation/individual/${individualId}`,
      submit: (id?: string) =>
        `/identity/accreditation/individual/${id}/submit`,
      get: (identityId?: string) =>
        `/identity/accreditation/individual/${identityId}`
    }
  },
  detailsOfIssuance: {
    create: (userId?: string) => `/identity/issuance-detail/${userId}`,
    update: (userId?: string, issuanceId?: string) =>
      `/identity/issuance-detail/${userId}/${issuanceId}`,
    get: (userId?: string) => `/identity/issuance-detail/${userId}`,
    submit: (issuanceId?: string) =>
      `/identity/issuance-detail/${issuanceId}/submit`
  },
  stats: {
    get: `/identity/stats`,
    list: `/identity/list`
  }
}

export const accountsURL = {
  banks: {
    getAll: (userId?: string) => `/accounts/banks/list/${userId}`,
    getById: (userId?: string, bankId?: string) =>
      `accounts/banks/${userId}/${bankId}`,
    create: (userId?: string) => `/accounts/banks/${userId}`,
    update: (userId?: string, bankId?: string) =>
      `/accounts/banks/${userId}/${bankId}`,
    remove: (userId?: string, bankId?: string) =>
      `/accounts/banks/${userId}/${bankId}/remove`
  },
  cashDeposits: {
    getAll: (userId?: string) => `/accounts/cash/deposits/${userId}`
  },
  cashWithdrawals: {
    create: (userId?: string) => `/accounts/cash/withdrawals/${userId}`
  },
  securityToken: {
    // getDepositAddress: '/custody/deposits/getDepositAddress'
    getDepositAddress: (assetId: string) =>
      `/deposits/deposit-address/${assetId}`,
    deposit: `/deposits/sto`,
    getDeposits: `/accounts/security/deposit`,
    exportDeposits: `/accounts/security/exportDeposit`,
    getWithdrawals: `/accounts/security/withdrawal`,
    exportWithdrawals: `/accounts/security/exportWithdrawal`
  },
  dsWithdrawals: {
    create: (userId?: string) => `/accounts/security/withdrawals/${userId}`,
    createCustodyWithdrawal: '/custody/withdrawals',
    getWithdrawalFee: (networkId?: string) =>
      `/accounts/security/withdrawals/fee-currency?network=${networkId}`
  },
  withdrawalAddresses: {
    getById: (userId?: string, withdrawalAddressId?: string) =>
      `accounts/withdrawal-addresses/${userId}/${withdrawalAddressId}`,
    create: (userId?: string) => `/accounts/withdrawal-addresses/${userId}`,
    getByUser: (userId?: string) =>
      `/accounts/withdrawal-addresses/list/${userId}`,
    getAll: (userId?: string) => `/accounts/withdrawal-addresses/list`,
    getAllNetworks: '/blockchain/networks'
  },
  assets: {
    getById: (assetId?: string) => `accounts/assets/${assetId}`,
    getAll: '/accounts/assets/list',
    custody: (userId?: string) => `/custody/available-tokens/${userId}`,
    getTokenInfo: '/custody/token-info'
  },
  ledger: {
    getTokenHoldings: '/ledger/token-holdings'
  },
  balance: {
    getAll: (userId?: string) => `/accounts/balance/${userId}`,
    getByUserId: (userId?: string) => `/accounts/currency-balance/${userId}`,
    getByAssetId: (userId?: string, assetId?: string) =>
      `/accounts/balance/${userId}/${assetId}`,
    getCurrencyBalanceByAssetId: (userId?: string, assetId?: string) =>
      `/accounts/currency-balance/${userId}/${assetId}`
  },
  virtualAccounts: {
    withdraw: (userId?: string, virtualAccountId?: string) =>
      `/virtual-accounts/withdrawals/${virtualAccountId}/${userId}`,
    getAllTransactions: (userId?: string, virtualAccountId?: string) =>
      `/virtual-accounts/transactions/list/${virtualAccountId}/${userId}`,
    getUserTransactions: (userId?: string) =>
      `/virtual-accounts/transactions/list/${userId}`,
    getPaymentMethods: (country?: string, swiftCode?: string) =>
      `/accounts/banks/payment-method?country=${country}&swiftCode=${swiftCode}`
  },
  commitments: {
    getAllByUserId: (userId?: string) => `/issuance/commitments/list/${userId}`,
    confirmCommitment: (commitmentId?: string) =>
      `/issuance/commitments/${commitmentId}/confirmInvestment`
  },
  dashboard: {
    getPortfolios: (userId?: string) => `/accounts/portfolios/${userId}`
  },
  reports: {
    getAccountInfo: (userId?: string) => `/accounts/account-info/${userId}`,
    getActivitySummary: (userId?: string) =>
      `/resources/financialReports/activitySummary/${userId}`,
    getTradeConfirmation: (userId?: string) =>
      `/resources/financialReports/tradeConfirmation/${userId}`,
    getFeeAndCharges: (userId?: string) =>
      `resources/financialReports/feeAndCharges/${userId}`,
    getDividends: (userId?: string) =>
      `/resources/financialReports/dividends/${userId}`
  }
}

export const ledgerURL = {
  getTokenTransactions: '/ledger/token-transactions',
  exportTokenTransactions: '/ledger/export/token-transactions'
}

export const tenantsURL = {
  getTenantInfoByCode: (tenantCode: string) =>
    `/tenant/tenant-info?tenantCode=${tenantCode}`,
  getTenantInfoById: (tenantId: string) =>
    `/tenant/tenant-info?_id=${tenantId}`,
  getAll: `/tenant/list`,
  createTenant: `/tenant/`,
  updateTenant: (tenantId?: string) => `/tenant/${tenantId}`,
  deleteTenant: (tenantId?: string) => `/tenant/${tenantId}`
}

export const issuanceURL = {
  sto: {
    totalStats: `/issuance/stats`,
    mostPopular: `/issuance/top-deals`,
    upcoming: `/issuance/upcoming-deals`
  },
  commitments: {
    overrideById: (commitmentId?: string) =>
      `/issuance/commitments/${commitmentId}/override`,
    createDSOActivity: (userId?: string, dsoId?: string) =>
      `/issuance/dso/${userId}/${dsoId}/activities`,
    getById: (userId?: string, commitmentId?: string) =>
      `/issuance/commitments/${userId}/${commitmentId}`,
    invest: (userId?: string) => `/issuance/commitments/${userId}`,
    commit: (userId?: string) => `/issuance/commitments/${userId}/commit`,
    getAll: (userId?: string) => `/issuance/commitments/${userId}`,
    getByDSOId: (dsoId?: string) => `/issuance/dso/${dsoId}/commitments/list`
  },
  dso: {
    getAllPromoted: '/issuance/dso/promoted/list',
    getAllApproved: '/issuance/dso/approved/list',
    getIssuerList: '/identity/corporate/issuerList',
    favorite: (dsoId?: string) => `/issuance/dso/favorites/${dsoId}`,
    topCountries: (dsoId?: string) =>
      `/issuance/dso/${dsoId}/charts/top-countries`,
    totalInvestors: (dsoId?: string) =>
      `/issuance/dso/${dsoId}/charts/total-investors`,
    topInvestors: (dsoId?: string) =>
      `/issuance/dso/${dsoId}/charts/top-investors`,
    commitmentsStats: (dsoId?: string) =>
      `/issuance/dso/${dsoId}/charts/commitment-stats`,
    investmentGrowth: (dsoId?: string) =>
      `/issuance/dso/${dsoId}/charts/investment-growth`,
    getById: (userId?: string, dsoId?: string) =>
      `/issuance/dso/${userId}/${dsoId}`,
    create: (userId?: string) => `/issuance/dso/${userId}`,
    getByUserId: (userId?: string) => `/issuance/dso/list/${userId}`,
    update: (userId?: string, dsoId?: string) =>
      `/issuance/dso/${userId}/${dsoId}`,
    submit: (userId?: string, dsoId?: string) =>
      `/issuance/dso/${userId}/${dsoId}/submit`,
    getActivitiesList: (userId?: string, dsoId?: string) =>
      `/issuance/dso/${userId}/${dsoId}/activities/list`,
    promote: (dsoId?: string) => `/issuance/dso/${dsoId}/settings`,
    disable: (dsoId?: string) => `/issuance/dso/${dsoId}/settings`,
    nonInvestable: (dsoId?: string) => `/issuance/dso/${dsoId}/settings`,
    capitalCall: (userId?: string, dsoId?: string) =>
      `/issuance/dso/${userId}/${dsoId}/capitalCall`,
    closeDeal: () => `/issuance/closure/create`,
    closure: (closureId?: string, issuerId?: string) =>
      `/issuance/closure/${closureId}/${issuerId}`,
    getDSOList: '/issuance/dso/list'
  },
  vcc: {
    getDSOList: '/vcc/dsos/list',
    getSubFundStats: 'vcc/subfund-stats',
    getInvestmentStats: 'vcc/subfund-growth-graph'
  },
  financialReports: {
    uploadFile: '/issuance/financial-report-file/create',
    getReport: (reportId?: string) =>
      `/issuance/financial-report-file/${reportId}`,
    reportTemplate: '/issuance/financial-report-file/template/recent'
  },
  whitelist: {
    getWhitelistedAddresses: '/issuance/whitelist/list',
    addToWhitelist: '/issuance/whitelist/add',
    removeFromWhitelist: '/issuance/whitelist/remove'
  }
}

export const authURL = {
  login: '/auth/sign-in',
  changePassword: (userId?: string) => `/auth/password/change/${userId}`,
  resetPassword: '/auth/password/reset/start',
  resetPasswordConfirm: '/auth/password/reset/confirm',
  sendVerificationEmail: '/auth/sendVerificationEmail',
  enable2fa: (userId?: string, otp?: string) =>
    `/auth/2fa/setup/${userId}/confirm/${otp}`,
  disable2fa: (userId: string) => `/auth/2fa/disable/${userId}`,
  setup2fa: (userId?: string) => `/auth/2fa/setup/${userId}`,
  remove2fa: (userId?: string) => `/auth/2fa/change/${userId}`,
  getEmailCode: (userId?: string) => `/auth/email-code/${userId}`,
  register: '/auth/registrations',
  registerConfirm: '/auth/registrations/confirm',
  reset2fa: (userId?: string) => `/auth/2fa/reset/${userId}`,
  getLoginHistory: (userId?: string) => `auth/users/${userId}/logins`,
  revokeAccess: '/auth/users/revoke',
  declineInvitation: (roleId: string) => `vcc/roles/${roleId}/decline`
}

export const userURL = {
  getUserById: (userId?: string) => `/auth/user/${userId}`,
  getUserByAccountId: (accountId?: string) =>
    `/auth/account/user?accountId=${accountId}`,
  getAll: '/auth/users/list',
  getUserProfile: (userId?: string) => `/auth/profiles/${userId}`,
  updateRoles: (userId?: string) => `/auth/users/${userId}/roles`,
  getCustomFields: (userId?: string, service?: string, feature?: string) =>
    `/core/custom-fields/${service}/${feature}/${userId}`,
  updateCustomFields: (userId?: string) => `/core/custom-fields/${userId}`,
  enableUser: '/auth/users/status'
}

export const notificationsURL = {
  markReadById: (userId?: string, notificationId?: string) =>
    `/core/notifications/mark-read/${userId}/${notificationId}`,
  markAllAsRead: (userId?: string) =>
    `/core/notifications/mark-read/all/${userId}`
}

export const documentsURL = {
  getAll: (userId?: string) => `/dataroom/list/${userId}`,
  getById: (userId?: string, fileId?: string) =>
    `/dataroom/raw/${userId}/${fileId}`,
  getBySuperUser: (fileId?: string) => `/dataroom/raw/${fileId}`,
  create: '/dataroom',
  deleteById: (userId?: string | undefined, fileId?: string) =>
    userId === undefined
      ? `/dataroom/${fileId}`
      : `/dataroom/${userId}/${fileId}`,
  deleteBySuperUser: (fileId?: string) => `/dataroom/${fileId}`
}

export const bannerURL = {
  uploadBanner: '/resources/banners',
  getBannersList: '/resources/banners',
  deleteBanner: (bannerId?: string) => `/resources/banners/${bannerId}`,
  getRowBanner: (bannerId?: string) => `/resources/banners/raw/${bannerId}`,
  updateBanner: (bannerId?: string) => `/resources/banners/${bannerId}`
}

export const virtualAccounts = {
  getAll: '/virtual-accounts/list',
  add: '/virtual-accounts',
  createManualTransaction: '/virtual-accounts/transactions/manual',
  getByUserId: (userId: string, type?: 'Currency' | 'Stablecoin') =>
    `/virtual-accounts/${userId}${type != null ? `?type=${type}` : ''}`,
  assign: '/virtual-accounts/assign',
  unassign: (accountId?: string) => `/virtual-accounts/unassign/${accountId}`,
  uploadCSV: '/virtual-accounts/upload',
  disable: '/virtual-accounts/disable',
  getById: (id?: string) => `/virtual-accounts/get-account/${id}`,
  getBalances: (accountId?: string) => `/virtual-accounts/balances/${accountId}`
}

export const exchange = {
  marketList: '/exchange/markets/list',
  otcList: 'otc/market/list',
  estimateFee: 'exchange/orders/estimate-fee',
  userOrders: (userId?: string) => `/exchange/orders/list/${userId}`,
  userTrades: (userId?: string) => `/exchange/trades/list/${userId}`,
  tradeHistory: {
    emit: 'fills/get',
    onMyFills: (tokenId?: string) => `myfills/${tokenId}`,
    on: (tokenId?: string) => `fills/${tokenId}`
  },
  orderBook: {
    emit: 'orderbook/get',
    on: (tokenId?: string) => `orderbook/${tokenId}`
  },
  lastPrice: {
    emit: 'price/get',
    on: (tokenId?: string) => `price/${tokenId}`
  },
  tokenBalance: {
    emit: 'tokenBalance/get',
    on: (userId?: string) => `tokenBalance/${userId}`
  },
  summary: {
    emit: 'metrics24h/get',
    on: (tokenId?: string) => `metrics24h/${tokenId}`
  },
  getMetrics: (tokenId?: string) =>
    `/exchange/pair/financialMetrics/${tokenId}`,
  currentHoldings: (userId?: string) => `/accounts/holdings/${userId}`,
  cancelOrder: (userId?: string, orderId?: string) =>
    `/exchange/orders/cancel/${userId}/${orderId}`,
  getListing: (userId?: string, listingId?: string) =>
    `/exchange/listing/${userId}/${listingId}`,
  getMarket: (pairId?: string) => `/exchange/markets/pair/${pairId}`
}

export const OTCUrl = {
  getApprovedListingsList: '/otc/listing/approved/list'
}

export const placeOrderURL = {
  create: '/exchange/orders'
}

export const exchangeMarket = {
  getOrdersList: (userId?: string) => `exchange/orders/list/${userId}`
}
export const trading = {
  getMyOrdersList: (ethAddress: string | null | undefined) =>
    `otc/order/list/my/open/${ethAddress}`,
  getMyPastOrders: `otc/order/list/my/past`,
  getConfirmedOrders: `/otc/order/list/confirm`,
  cancelOTCOrder: (orderId: string) => `/otc/order/cancel/${orderId}`,
  confirmOTCOrder: ({
    orderId,
    matchedOrderId
  }: {
    orderId: string
    matchedOrderId: string
  }) => `/otc/order/confirm/${orderId}/${matchedOrderId}`,
  rejectOTCOrder: ({
    orderId,
    matchedOrderId
  }: {
    orderId: string
    matchedOrderId: string
  }) => `/otc/order/reject/${orderId}/${matchedOrderId}`,
  confirmMyOrder: ({
    orderId,
    matchedOrderId
  }: {
    orderId: string
    matchedOrderId: string
  }) => `/otc/order/my/confirm/${orderId}/${matchedOrderId}`,
  getUnmatchedOrders: (side: OrderType) =>
    `/otc/order/list/${side.toLowerCase()}`,
  getMatchedOrders: '/otc/order/list/match',
  getFeaturedPair: '/otc/config/featured-pair',
  createOrder: '/otc/order',
  getMarket: (pairId?: string) => `/otc/pair/${pairId}`,
  getOtcOrderBook: (pairId?: string) => `/otc/orderbook/${pairId}`
}
export const listings = {
  getCombinedList: (userId: string) => `/exchange/combinedListing/${userId}`,
  getListByUser: (userId?: string) => `exchange/listing/list/${userId}`,
  submitListing: (userId?: string, listingId?: string) =>
    `/exchange/listing/${userId}/${listingId}/submitBoth`
}

export const charts = {
  config: 'exchange/udf/config',
  symbols: 'exchange/udf/symbols',
  history: 'exchange/udf/history',
  time: 'exchange/udf/time',
  search: 'exchange/udf/search'
}

export const custodyAccount = {
  get: (userId?: string) => `/custody/account/${userId}`,
  create: '/custody/account/assign'
}

export const listingsURL = {
  getById: (userId?: string, listingId?: string) =>
    `/exchange/listing/${userId}/${listingId}`,
  createOrUpdate: (userId?: string) => `/exchange/listing/${userId}`,
  create: (userId?: string) => `/exchange/otc/listing/${userId}`,
  getOTCListing: (UserId?: string, OTCListingId?: string) =>
    `/otc/listing/${UserId}/${OTCListingId}`
}

export const assetsURL = {
  getAssetsList: () => '/accounts/assets/list'
}

export const atlasOneURL = {
  getSecurities: '/resources/securities',
  getTimeSeries: '/resources/timeseries'
}

export const resources = {
  getSiteConfig: '/resources/siteConfig',
  createOrUpdateMasDisclosure: '/resources/siteConfig/masDisclosure',
  acceptMasDisclosure: '/resources/siteConfig/masDisclosure/accept',
  uploadExchangeRules: '/resources/siteConfig/exchangeRules',
  getExchangeRules: '/resources/siteConfig/exchangeRules'
}

export const custodyAccounts = {
  getList: 'accounts/custody-accounts/list',
  unAssignCustody: '/accounts/custody-unassign',
  getCustodianDetails: (accountId?: string) =>
    `/accounts/get-custodian/${accountId}`,
  getCustodiansCount: '/accounts/get-custodians-count'
}

export const virtualAccountsAudit = {
  getMT940Files: '/virtual-accounts/audit/mt940/files',
  getMT942Files: '/virtual-accounts/audit/mt942/files',
  getOutboundFiles: '/virtual-accounts/audit/outbound/files',
  getRawMT940File: (fileId?: string) =>
    `/virtual-accounts/audit/mt940/files/${fileId}`,
  getRawMT942File: (fileId?: string) =>
    `/virtual-accounts/audit/mt942/files/${fileId}`,
  getRawOutboundACKFile: (fileId?: string) =>
    `/virtual-accounts/audit/outbound/files/ack/${fileId}`,
  getRawOutboundVAFile: (fileId?: string) =>
    `/virtual-accounts/audit/outbound/files/va/${fileId}`
}

export const virtualTransactions = {
  getTransactions: '/virtual-accounts/audit/transactions'
}

export const blockchainNetworksURL = {
  getSettings: (network?: string) => `/blockchain/settings/${network}`,
  getUpdateDecimal: (network?: string, decimal?: number) =>
    `/blockchain/settings/decimal/${network}/${decimal}`,
  generateWalletHash: '/blockchain/wallets/generateWalletHash',
  verifyWalletOwnership: '/blockchain/wallets/verifyOwnership',
  checkAddress: `/blockchain/wallets/detectNetwork`
}
