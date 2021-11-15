export interface CustodyAccount {
  id: string
  accountName: string
  accountId: number
  wallet: {
    wallet_name: string
    asset_tickers: string[]
  }
  user: string
  createdAt: string
  updatedAt: string
}

export interface CustodyAccountsListItem {
  _id: string
  status: string
  name: string
  userId: string
  walletAddress: string
  accountId: number
  active: boolean
  assignedAt: string
  type: string
}

export interface CustodyDetails {
  wallets: Wallet[]
  account_id: number
  account_name: string
  user: {
    name: string
  }
}

export interface Wallet {
  asset_tickers: string[]
  wallet_name: string
}

export interface CustodiansCount {
  hexCount: number
  investaxCount: number
  hexPercent: string
  investaxPercent: string
}
