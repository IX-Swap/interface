export interface SecToken {
  name: string
  ticker: string
  status: string
  network: string
  platformId: number
  description: string | null
  logoId: number | null
  tokenUser: TokenUser | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface TokenUser {
  tokenId: number
  userId: number
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
