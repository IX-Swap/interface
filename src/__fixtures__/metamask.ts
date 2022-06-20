import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'

export const propsWithBalances = {
  tab: 0,
  currencyBalance: 1,
  tokenBalance: 1,
  tokenName: '2'
}

export const propsWithoutCurrency = {
  ...propsWithBalances,
  currencyBalance: 0
}

export const propsWithoutTokens = {
  ...propsWithBalances,
  tab: 1,
  tokenBalance: 0
}

export const mockMetamaskDetailsEmptyWarning = {
  switchChain: jest.fn(),
  accountState: AccountState.SAME_CHAIN,
  targetChainName: 'test chain',
  isWhitelisted: { found: true }
}

export const mockMetamaskDetailsNotConnected = {
  ...mockMetamaskDetailsEmptyWarning,
  accountState: AccountState.NOT_CONNECTED,
  isWhitelisted: { found: false }
}

export const mockMetamaskDetailsNotWhitelisted = {
  ...mockMetamaskDetailsEmptyWarning,
  isWhitelisted: { found: false }
}

export const mockMetamaskDetailsChainDifferent = {
  ...mockMetamaskDetailsEmptyWarning,
  accountState: AccountState.DIFFERENT_CHAIN
}
