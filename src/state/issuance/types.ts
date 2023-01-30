export interface WhitelistWalletPayload {
  fullName: string
  wallet: string
}

export interface WhitelistWallet {
  id: number
  fullName: string
  walletAddress: string
  userId: number
}
