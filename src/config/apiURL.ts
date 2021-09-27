import { AppFeature } from 'types/app'

export const apiURL = {
  authorizerBanks: '/accounts/banks/list'
}

export const homeURL = {
  getAccessReports: '/dataroom/reports-and-newsletters/list',
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
  [AppFeature.DigitalSecurityWithdrawals]: '/accounts/security/withdrawals',
  [AppFeature.Offerings]: '/issuance/dso/list',
  bulkAuthorizeCommitments: (action: 'approve' | 'reject') =>
    `/issuance/commitments/${action}`
}

export const identityURL = {
  corporates: {
    getAllBySuperUser: '/identity/corporates/list',
    getAllByUserId: (userId: string) => `/identity/corporates/${userId}/list`,
    create: (userId: string) => `/identity/corporates/${userId}`,
    update: (userId: string, corporateId: string) =>
      `/identity/corporates/${userId}/${corporateId}`,
    submit: (id: string) => `/identity/corporates/${id}/submit`,
    get: (userId: string, identityId: string) =>
      `/identity/corporates/${userId}/${identityId}`
  },
  individuals: {
    create: (userId: string) => `/identity/individuals/${userId}`,
    update: (userId: string) => `/identity/individuals/${userId}`,
    get: (userId: string) => `/identity/individuals/${userId}`,
    submit: (id: string) => `/identity/individuals/${id}/submit`
  },
  detailsOfIssuance: {
    create: (userId: string) => `/identity/issuance-detail/${userId}`,
    update: (userId: string, issuanceId: string) =>
      `/identity/issuance-detail/${userId}/${issuanceId}`,
    get: (userId: string) => `/identity/issuance-detail/${userId}`,
    submit: (issuanceId: string) =>
      `/identity/issuance-detail/${issuanceId}/submit`
  },
  stats: {
    get: `/identity/stats`,
    list: `/identity/list`
  }
}

export const accountsURL = {
  banks: {
    getAll: (userId: string) => `/accounts/banks/list/${userId}`,
    getById: (userId: string, bankId: string) =>
      `accounts/banks/${userId}/${bankId}`,
    create: (userId: string) => `/accounts/banks/${userId}`,
    update: (userId: string, bankId: string) =>
      `/accounts/banks/${userId}/${bankId}`
  },
  cashDeposits: {
    getAll: (userId: string) => `/accounts/cash/deposits/${userId}`
  },
  cashWithdrawals: {
    create: (userId: string) => `/accounts/cash/withdrawals/${userId}`
  },
  dsWithdrawals: {
    create: (userId: string) => `/accounts/security/withdrawals/${userId}`
  },
  withdrawalAddresses: {
    getById: (userId: string, withdrawalAddressId: string) =>
      `accounts/withdrawal-addresses/${userId}/${withdrawalAddressId}`,
    create: (userId: string) => `/accounts/withdrawal-addresses/${userId}`,
    getAll: (userId: string) => `/accounts/withdrawal-addresses/list/${userId}`,
    getAllNetworks: '/blockchain/networks'
  },
  assets: {
    getById: (assetId: string) => `accounts/assets/${assetId}`,
    getAll: '/accounts/assets/list'
  },
  balance: {
    getAll: (userId: string) => `/accounts/balance/${userId}`,
    getByUserId: (userId: string) => `/accounts/balance/${userId}`,
    getByAssetId: (userId: string, assetId: string) =>
      `/accounts/balance/${userId}/${assetId}`,
    getCurrencyBalanceByAssetId: (userId: string, assetId: string) =>
      `/accounts/currency-balance/${userId}/${assetId}`
  },
  virtualAccounts: {
    withdraw: (userId: string, virtualAccountId: string) =>
      `/virtual-accounts/withdrawals/${virtualAccountId}/${userId}`,
    getAllTransactions: (userId: string, virtualAccountId: string) =>
      `/virtual-accounts/transactions/list/${virtualAccountId}/${userId}`,
    getPaymentMethods: (country: string, swiftCode: string) =>
      `/accounts/banks/payment-method?country=${country}&swiftCode=${swiftCode}`
  },
  commitments: {
    getAllByUserId: (userId: string) => `/issuance/commitments/list/${userId}`,
    confirmCommitment: (commitmentId: string) =>
      `/issuance/commitments/${commitmentId}/confirmInvestment`
  }
}

export const issuanceURL = {
  commitments: {
    overrideById: (commitmentId: string) =>
      `/issuance/commitments/${commitmentId}/override`,
    createDSOActivity: (userId: string, dsoId: string) =>
      `/issuance/dso/${userId}/${dsoId}/activities`,
    getById: (userId: string, commitmentId: string) =>
      `/issuance/commitments/${userId}/${commitmentId}`,
    invest: (userId: string) => `/issuance/commitments/${userId}`,
    commit: (userId: string) => `/issuance/commitments/${userId}/commit`,
    getAll: (userId: string) => `/issuance/commitments/${userId}`,
    getByDSOId: (dsoId: string) => `/issuance/dso/${dsoId}/commitments/list`
  },
  dso: {
    getAllPromoted: '/issuance/dso/promoted/list',
    getAllApproved: '/issuance/dso/approved/list',
    favorite: (dsoId: string) => `/issuance/dso/favorites/${dsoId}`,
    topCountries: (dsoId: string) =>
      `/issuance/dso/${dsoId}/charts/top-countries`,
    totalInvestors: (dsoId: string) =>
      `/issuance/dso/${dsoId}/charts/total-investors`,
    topInvestors: (dsoId: string) =>
      `/issuance/dso/${dsoId}/charts/top-investors`,
    commitmentsStats: (dsoId: string) =>
      `/issuance/dso/${dsoId}/charts/commitment-stats`,
    investmentGrowth: (dsoId: string) =>
      `/issuance/dso/${dsoId}/charts/investment-growth`,
    getById: (userId: string, dsoId: string) =>
      `/issuance/dso/${userId}/${dsoId}`,
    create: (userId: string) => `/issuance/dso/${userId}`,
    getByUserId: (userId: string) => `/issuance/dso/list/${userId}`,
    update: (userId: string, dsoId: string) =>
      `/issuance/dso/${userId}/${dsoId}`,
    submit: (userId: string, dsoId: string) =>
      `/issuance/dso/${userId}/${dsoId}/submit`,
    getActivitiesList: (userId: string, dsoId: string) =>
      `/issuance/dso/${userId}/${dsoId}/activities/list`,
    promote: (dsoId: string) => `/issuance/dso/${dsoId}/promote`,
    disable: (dsoId: string) => `/issuance/dso/${dsoId}/disable`,
    capitalCall: (userId: string, dsoId: string) =>
      `/issuance/dso/${userId}/${dsoId}/capitalCall`,
    closeDeal: () => `/issuance/closure/create`,
    closure: (closureId: string, issuerId: string) =>
      `/issuance/closure/${closureId}/${issuerId}`,
    getDSOList: '/issuance/dso/list'
  }
}

export const authURL = {
  login: '/auth/sign-in',
  changePassword: (userId: string) => `/auth/password/change/${userId}`,
  resetPassword: '/auth/password/reset/start',
  resetPasswordConfirm: '/auth/password/reset/confirm',
  enable2fa: (userId: string, otp: string) =>
    `/auth/2fa/setup/${userId}/confirm/${otp}`,
  setup2fa: (userId: string) => `/auth/2fa/setup/${userId}`,
  register: '/auth/registrations',
  registerConfirm: '/auth/registrations/confirm',
  reset2fa: (userId: string) => `/auth/2fa/reset/${userId}`,
  getLoginHistory: (userId: string) => `auth/users/${userId}/logins`,
  revokeAccess: '/auth/users/revoke'
}

export const userURL = {
  getUserById: (userId: string) => `/auth/user/${userId}`,
  getAll: '/auth/users/list',
  getUserProfile: (userId: string) => `/auth/profiles/${userId}`,
  updateRoles: (userId: string) => `/auth/users/${userId}/roles`,
  getCustomFields: (userId: string, service: string, feature: string) =>
    `/core/custom-fields/${service}/${feature}/${userId}`,
  updateCustomFields: (userId: string) => `/core/custom-fields/${userId}`,
  enableUser: '/auth/users/status'
}

export const notificationsURL = {
  markReadById: (userId: string, notificationId: string) =>
    `/core/notifications/mark-read/${userId}/${notificationId}`,
  markAllAsRead: (userId: string) =>
    `/core/notifications/mark-read/all/${userId}`
}

export const documentsURL = {
  getAll: (userId: string) => `/dataroom/list/${userId}`,
  getById: (userId: string, fileId: string) =>
    `/dataroom/raw/${userId}/${fileId}`,
  getBySuperUser: (fileId: string) => `/dataroom/raw/${fileId}`,
  create: '/dataroom',
  deleteById: (userId: string | undefined, fileId: string) =>
    userId === undefined
      ? `/dataroom/${fileId}`
      : `/dataroom/${userId}/${fileId}`,
  deleteBySuperUser: (fileId: string) => `/dataroom/${fileId}`,
  uploadAccessReport: '/dataroom/reports-and-newsletters',
  getAccessReport: (fileId: string) =>
    `/dataroom/reports-and-newsletters/${fileId}`
}

export const bannerURL = {
  uploadBanner: '/resources/banners',
  getBannersList: '/resources/banners',
  deleteBanner: (bannerId: string) => `/resources/banners/${bannerId}`,
  getRowBanner: (bannerId: string) => `/resources/banners/raw/${bannerId}`,
  updateBanner: (bannerId: string) => `/resources/banners/${bannerId}`
}

export const virtualAccounts = {
  getAll: '/virtual-accounts/list',
  add: '/virtual-accounts',
  getByUserId: (userId: string) => `/virtual-accounts/${userId}`,
  assign: '/virtual-accounts/assign',
  unassign: (accountId: string) => `/virtual-accounts/unassign/${accountId}`,
  uploadCSV: '/virtual-accounts/upload',
  disable: '/virtual-accounts/disable',
  getById: (id: string) => `/virtual-accounts/get-account/${id}`
}

export const exchange = {
  marketList: '/exchange/markets/list',
  userOrders: (userId: string) => `/exchange/orders/list/${userId}`,
  userTrades: (userId: string) => `/exchange/trades/list/${userId}`,
  tradeHistory: {
    emit: 'fills/get',
    onMyFills: (tokenId: string) => `myfills/${tokenId}`,
    on: (tokenId: string) => `fills/${tokenId}`
  },
  orderBook: {
    emit: 'orderbook/get',
    on: (tokenId: string) => `orderbook/${tokenId}`
  },
  lastPrice: {
    emit: 'price/get',
    on: (tokenId: string) => `price/${tokenId}`
  },
  tokenBalance: {
    emit: 'tokenBalance/get',
    on: (userId: string) => `tokenBalance/${userId}`
  },
  summary: {
    emit: 'metrics24h/get',
    on: (tokenId: string) => `metrics24h/${tokenId}`
  },
  getMetrics: (tokenId: string) => `/exchange/pair/financialMetrics/${tokenId}`,
  currentHoldings: (userId: string) => `/accounts/holdings/${userId}`,
  cancelOrder: (userId: string, orderId: string) =>
    `/exchange/orders/cancel/${userId}/${orderId}`,
  getListing: (userId: string, listingId: string) =>
    `/exchange/listing/${userId}/${listingId}`,
  getMarket: (pairId: string) => `/exchange/markets/pair/${pairId}`
}

export const OTCUrl = {
  getApprovedListingsList: '/otc/listing/approved/list'
}

export const placeOrderURL = {
  create: '/exchange/orders'
}

export const exchangeMarket = {
  getOrdersList: (userId: string) => `exchange/orders/list/${userId}`
}

export const listings = {
  getListByUser: (userId: string) => `exchange/listing/list/${userId}`,
  submitListing: (userId: string, listingId: string) =>
    `/exchange/listing/${userId}/${listingId}/submit`
}

export const charts = {
  config: 'exchange/udf/config',
  symbols: 'exchange/udf/symbols',
  history: 'exchange/udf/history',
  time: 'exchange/udf/time',
  search: 'exchange/udf/search'
}

export const custodyAccount = {
  get: (userId: string) => `/custody/account/${userId}`,
  create: '/custody/account/assign'
}

export const listingsURL = {
  getById: (userId: string, listingId: string) =>
    `/exchange/listing/${userId}/${listingId}`,
  create: (userId: string) => `/exchange/listing/${userId}`,
  update: (userId: string, dsoId: string) =>
    `/exchange/listing/${userId}/${dsoId}`
}

export const assetsURL = {
  getAssetsList: () => '/accounts/assets/list'
}

export const resources = {
  getSiteConfig: '/resources/siteConfig',
  createOrUpdateMasDisclosure: '/resources/siteConfig/masDisclosure',
  acceptMasDisclosure: '/resources/siteConfig/masDisclosure/accept'
}

export const virtualAccountsAudit = {
  getMT940Files: 'https://hsbc.mozork.com/audit/virtual-account/mt940/files',
  getMT942Files: 'https://hsbc.mozork.com/audit/virtual-account/mt942/files',
  getOutboundFiles:
    'https://hsbc.mozork.com/audit/virtual-account/outbound/files',
  getRawMT940File: (fileId: string) =>
    `https://hsbc.mozork.com/audit/virtual-account/mt940/files/raw/${fileId}`,
  getRawMT942File: (fileId: string) =>
    `https://hsbc.mozork.com/audit/virtual-account/mt942/files/raw/${fileId}`,
  getRawOutboundACKFile: (fileId: string) =>
    `https://hsbc.mozork.com/audit/virtual-account/outbound/files/raw/${fileId}`,
  getRawOutboundVAFile: (fileId: string) =>
    `https://hsbc.mozork.com/audit/virtual-account/outbound/files/raw/va/${fileId}`
}

export const virtualTransactions = {
  getTransactions: 'https://hsbc.mozork.com/payments/transactions'
}
