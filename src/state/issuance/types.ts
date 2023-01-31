export interface WhitelistWalletPayload {
  fullName: string
  walletAddress: string
}

export interface WhitelistWallet {
  id: number
  fullName: string
  walletAddress: string
  userId: number
}
