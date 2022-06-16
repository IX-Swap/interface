import { ActionFilterTabs } from 'components/Vault/enum'

export const admin = {
  login: 'auth/login',
  usersList: 'users',
  createUser: '/users/create',
  updateUser: (id: number) => `/users/${id}`,
  brokerDealerList: '/broker-dealer/list',
  getSwaps: 'broker-dealer/swaps/all',
  accreditationList: '/kyc/list',
  accreditationReset: (accreditationId: number) => `/kyc/restart/${accreditationId}`,
  approveAccreditation: (id: number) => `/kyc/approve/${id}`,
  declineAccreditation: (id: number) => `/kyc/decline/${id}`,
  kycList: '/newkyc/list',
  resetKyc: (kycId: number) => `/newkyc/change/${kycId}`,
  approveKyc: (id: number, riskReportId: number) => `/newkyc/approve/${id}?riskReportId=${riskReportId}`,
  rejectKyc: (id: number, riskReportId: number) => `/newkyc/reject/${id}?riskReportId=${riskReportId}`,
  kycById: (id: string | number) => `/newkyc/id/${id}`,
  resubmitKyc: (id: string | number) => `/newkyc/resubmit/${id}`,
  getAtlasIdByTicker: (ticker: string) => `/catalog/atlas?ticker=${ticker}`,
  addAdmin: () => '/metamask/admin',
  whitelistedList: 'users/whitelisted',
  addOrRemoveWhitelisted: (address: string) => `users/whitelist/address/${address}`,
}

export const tokenManager = {
  myPayouts: 'payout/list',
  payoutHistory: 'payout/history',
}

export const vesting = {
  privateBuyer: 'investor/me',
}

export const metamask = {
  challenge: `metamask/challenge`,
  login: `metamask/login`,
  hasLogged: (hash: string) => `/metamask/hasLogged/${hash}`,
}

export const auth = {
  refresh: `auth/refresh`,
  me: 'auth/me',
}

export const payout = {
  createDraft: `payout/draft`,
}

export const kyc = {
  getAccreditation: (tokenId: number, isKyc: boolean) => `kyc/getAccreditation/${tokenId}?isKyc=${isKyc}`,
  restartAccreditation: (accreditationRequestId: number) => `kyc/my/restart/${accreditationRequestId}`,
  createIndividual: `/newkyc/individual`,
  createCorporate: `/newkyc/corporate`,
  updateIndividual: (kycId: number) => `/newkyc/individual/${kycId}`,
  updateCorporate: (kycId: number) => `/newkyc/corporate/${kycId}`,
  cynopsisRisks: (address: string) => `/newkyc/cynopsis/${address}`,
  getMyKyc: `newkyc/me`,
  getStatusStats: `newkyc/status/stats`,
  individualProgress: `newkyc/individual/progress`,
  corporateProgress: `newkyc/corporate/progress`,
}

export const broker = {
  choose: (pairId: number) => `broker-dealer/choose/${pairId}`,
  pairs: (tokenId: number) => `broker-dealer/${tokenId}/pairs`,
  storeTx: () => `/broker-dealer/swaps/add-hash`,
}
export const nft = {
  create: `nft`,
  createCollection: `/nft/collection`,
  updateCollection: (id: number) => `/nft/collection/${id}`,
  getCollection: (id: number, chainId: number | undefined) => `/nft/collection/${id}?chainId=${chainId}`,

  getCollectionByAddress: (address: string, chainId: number | undefined) =>
    `/nft/collection/address/${address}?chainId=${chainId}`,

  getCollections: (address: string, chainId: number | undefined) =>
    `/nft/collection/user/${address}?chainId=${chainId}`,
}
export const tokens = {
  fromUser: `/token/list`,
  authorize: (tokenId: number) => `/token/swap-authorize/${tokenId}`,
  swapConfirm: (brokerDealerId: number) => `/token/swap-confirm/${brokerDealerId}`,
  all: `/token/list/all`,
  accreditation: (tokenId: number) => `token/accreditation/${tokenId}`,
}

export const secCatalog = {
  createIssuer: `/catalog/issuer`,
  allIssuers: `/catalog/issuer/all`,
  myTokens: `/catalog/token/list`,
  allIssuerTokens: `/catalog/token/list/all`,
  getAtlasAll: `/catalog/atlas/all`,
  getAtlasInfo: (atlasOneId: string) => `/catalog/atlas/${atlasOneId}`,
  issuer: (issuerId: number) => `/catalog/issuer/${issuerId}`,
  createIssuerToken: (issuerId: number) => `/catalog/token/issuer/${issuerId}`,
  issuerToken: (tokenId: number) => `/catalog/token/${tokenId}`,
  checkWrappedAddress: (address: string) => `/token/address/${address}`,
}

export const users = {
  update: (address: string) => `/users/settings/address/${address}`,
}

export interface PaginateWithFilter {
  tokenId?: number | null
  page?: number
  filter?: ActionFilterTabs
}
export const custody = {
  deposit: '/custody/deposit/request',
  withdraw: `/custody/withdraw/request`,
  cancelDeposit: (requestId: number) => `/custody/deposit/cancel/${requestId}`,
  requests: ({ page, tokenId, filter }: PaginateWithFilter) => {
    let filters = ''
    filters += getQueryParam({ param: 'tokenId', value: tokenId, isFirst: true })
    filters += getQueryParam({
      param: 'request',
      value: filter === 'all' ? '' : filter,
      isFirst: !Boolean(tokenId),
    })
    filters += getQueryParam({ param: 'page', value: page, isFirst: !Boolean(tokenId || filter) })
    return `/custody/request?${filters}`
  },
  feePrice: (id: number | string) => `/token/price/${id}`,
  withdrawStatus: (id: number | string) => `/custody/withdraw/fee-status/${id}`,
  draftWithdraw: '/custody/withdraw/prepare-whitelist',
  preparePaidFee: '/custody/withdraw/prepare-fee',
  paidFee: '/custody/withdraw/fee-whitelist',
}

export const eventLog = {
  list: ({ tokenId, filter, page }: PaginateWithFilter) => {
    let filters = ''
    filters += getQueryParam({ param: 'tokenId', value: tokenId, isFirst: true })
    filters += getQueryParam({
      param: 'event',
      value: `${filter},kyc`,
      isFirst: !Boolean(tokenId),
    })
    filters += getQueryParam({ param: 'page', value: page, isFirst: !Boolean(tokenId || filter) })
    return `/event-log/list?${filters}`
  },
}

const getQueryParam = ({
  param,
  value,
  isFirst,
}: {
  param: string
  value?: string | number | null
  isFirst: boolean
}) => {
  return param ? `${isFirst ? '' : '&'}${queryParams[param]}=${value}` : ''
}
const queryParams: { [key: string]: string } = {
  page: 'page',
  tokenId: 'tokenId',
  event: 'eventType',
  request: 'requestType',
}
