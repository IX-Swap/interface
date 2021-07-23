export const metamask = {
  challenge: `metamask/challenge`,
  login: `metamask/login`,
}

export const tokens = {
  fromUser: `/token/list`,
  all: `/token/list/all`,
  withdraw: (tokenId: number) => `/token/allowance-digest/${tokenId}`,
  accreditation: (tokenId: number) => `token/accreditation/${tokenId}`,
}

export const custody = {
  deposit: '/custody/deposit/request',
}

export const eventLog = {
  list: '/event-log/list',
}
