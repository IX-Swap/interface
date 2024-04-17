import { OrderType } from "state/launchpad/types"

export interface Lbp {
  id: number
  name: string
}

export interface ManagedLbpInvestment {
  username: string | null
  tokenAmount: number
  walletAddress: string
}

export interface ManagedLbpInvestmentConfig {
  username?: OrderType
  tokenAmount?: OrderType
  walletAddress?: OrderType
}