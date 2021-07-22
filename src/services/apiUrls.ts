export const metamask = {
  challenge: `metamask/challenge`,
  login: `metamask/login`,
}

export const tokens = {
  fromUser: `/token/list`,
  all: `/token/list/all`,
  withdraw: (tokenId: number) => `/token/allowance-digest/${tokenId}`,
}

export const custody = {
  deposit: '/custody/deposit/request',
}
