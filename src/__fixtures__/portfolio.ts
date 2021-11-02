import { BalancesInfo, MarketInfo, VirtualAccountInfo } from 'types/portfolio'

export const fakeVirtualAccountInfo: VirtualAccountInfo = {
  _id: '608108b8f23f7412a9ba1cd3',
  currency: 'SGD',
  balance: 1000
}

export const fakeBalancesInfo: BalancesInfo = {
  availableBalance: 100,
  primaryInvestmentBalance: 200,
  secondaryInvestmentBalance: 300,
  totalAssetBalance: 400,
  withdrawalAddressCount: 5
}

export const fakeMarketInfo: MarketInfo = {
  equityAmount: 1000,
  hybridAmount: 2000,
  debtAmount: 3000,
  fundAmount: 4000,
  totalAmount: 10000
}
