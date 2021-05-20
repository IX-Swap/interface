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
  [AppFeature.Offerings]: '/issuance/dso/list'
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
    getAll: (userId: string) => `/accounts/cash/deposits/${userId}`,
    getAllVirtualAccountTransactions: (
      userId: string,
      virtualAccountId: string
    ) => `/virtual-accounts/transactions/list/${virtualAccountId}/${userId}`
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
      `/accounts/balance/${userId}/${assetId}`
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
    getAll: (userId: string) => `/issuance/commitments/${userId}`
  },
  dso: {
    getAllPromoted: '/issuance/dso/promoted/list',
    getAllApproved: '/issuance/dso/approved/list',
    getAllByUserId: (userId: string) => `/issuance/dso/list/${userId}`,
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
    disable: (dsoId: string) => `/issuance/dso/${dsoId}/disable`
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

export const virtualAccounts = {
  getAll: '/virtual-accounts/list',
  add: '/virtual-accounts',
  getByUserId: (userId: string) => `/virtual-accounts/${userId}`
}

export const exchange = {
  marketList: '/exchange/markets/list',
  userTrades: (userId: string) => `/exchange/trades/list/${userId}`,
  tradeHistory: {
    emit: 'fills/get',
    on: (tokenId: string) => `fills/${tokenId}`
  },
  orderBook: {
    emit: 'orderbook/get',
    on: (tokenId: string) => `orderbook/${tokenId}`
  }
}

export const exchangeMarket = {
  getOrdersList: (userId: string) => `exchange/orders/list/${userId}`
}
