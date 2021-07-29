export const metamask = {
  challenge: `metamask/challenge`,
  login: `metamask/login`,
}

export const tokens = {
  fromUser: `/token/list`,
  all: `/token/list/all`,
  accreditation: (tokenId: number) => `token/accreditation/${tokenId}`,
}

export const custody = {
  deposit: '/custody/deposit/request',
  withdraw: `/custody/withdraw/request`,
  cancelDeposit: (requestId: number) => `/custody/deposit/cancel/${requestId}`,
}

export const eventLog = {
  list: '/event-log/list',
}
