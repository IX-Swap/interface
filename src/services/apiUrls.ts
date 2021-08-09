import { ActionTypes } from 'components/Vault/enum'

export const metamask = {
  challenge: `metamask/challenge`,
  login: `metamask/login`,
  hasLogged: (hash: string) => `/metamask/hasLogged/${hash}`,
}

export const tokens = {
  fromUser: `/token/list`,
  authorize: (tokenId: number) => `/token/swap-authorize/${tokenId}`,
  all: `/token/list/all`,
  accreditation: (tokenId: number) => `token/accreditation/${tokenId}`,
}
export interface PaginateWithFilter {
  tokenId?: number | null
  page?: number
  filter?: ActionTypes
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
      value: filter,
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
