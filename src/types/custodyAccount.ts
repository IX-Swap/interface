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
