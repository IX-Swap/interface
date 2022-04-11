import { TokenInfo } from '@uniswap/token-lists'
import { Currency } from '@ixswap1/sdk-core'

export interface SecToken extends TokenInfo {
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
  isSecToken: true
  contractAddress?: string
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
