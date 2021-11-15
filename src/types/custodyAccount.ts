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
