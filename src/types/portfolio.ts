export interface VirtualAccountInfo {
  _id: string
  currency: string
  balance: number
}

export interface BalancesInfo {
  availableBalance: number
  primaryInvestmentBalance: number
  secondaryInvestmentBalance: number
  totalAssetBalance: number
  withdrawalAddressCount: number
}

export interface MarketInfo {
  equityAmount: number
  hybridAmount: number
  debtAmount: number
  fundAmount: number
  totalAmount: number
}

export interface AccountPortfolio {
  accounts: VirtualAccountInfo[]
  balances: BalancesInfo
  primaryMarket: MarketInfo
  secondaryMarket: MarketInfo
}
