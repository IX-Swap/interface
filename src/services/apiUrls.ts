import { ActionFilterTabs } from 'components/Vault/enum'

export const admin = {
  login: 'auth/login',
  me: 'auth/me',
  kycList: '/kyc/list',
  brokerDealerList: '/broker-dealer/list',
  getSwaps: 'broker-dealer/swaps/all',
  kycReset: (accreditationId: number) => `/kyc/restart/${accreditationId}`,
  approveKyc: (id: number) => `/kyc/approve/${id}`,
  declineKyc: (id: number) => `/kyc/decline/${id}`,
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
}

export const kyc = {
  getAccreditation: (tokenId: number) => `kyc/getAccreditation/${tokenId}`,
  restartAccreditation: (accreditationRequestId: number) => `kyc/my/restart/${accreditationRequestId}`,
}

export const broker = {
  choose: (pairId: number) => `broker-dealer/choose/${pairId}`,
  pairs: (tokenId: number) => `broker-dealer/${tokenId}/pairs`,
  storeTx: () => `/broker-dealer/swaps/add-hash`,
}
export const nft = {
  create: `nft`,
  createCollection: `/nft/collection`,
  getCollection: (id: number, chainId: number | undefined) => `/nft/collection/${id}?chainId=${chainId}`,
  updateCollection: (id: number) => `/nft/collection/${id}`,
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
  issuer: (issuerId: number) => `/catalog/issuer/${issuerId}`,
  createIssuerToken: (issuerId: number) => `/catalog/token/issuer/${issuerId}`,
  issuerToken: (tokenId: number) => `/catalog/token/${tokenId}`,
  checkWrappedAddress: (address: string) => `/token/address/${address}`,
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
