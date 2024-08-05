import { TokenInfo } from '@uniswap/token-lists'
import { Currency } from '@ixswap1/sdk-core'

export interface SecTokenLogo {
  public: string
}

export interface SecToken extends TokenInfo {
  id: number
  catalogId: number
  ticker: string
  status: string
  network: string
  platformId: number
  description: string | null
  logoId: number | null
  logo?: SecTokenLogo
  tokenUser: TokenUser | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isSecToken: true
  contractAddress?: string
  originalSymbol?: string
  platform?: SecTokenPlatform
}

export interface SecTokenPlatform {
  description: string
  id: number
  name: string
  website: string
}

export interface TokenUser {
  tokenId: number
  userId: number
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type SecCurrency = Currency & {
  originalSymbol?: string | null
}
