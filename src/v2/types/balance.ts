import { NumberFormat } from './util'

export interface Balance {
  debitTotal: number
  creditTotal: number
  balance: number
  lastTransaction: string
  assetId: string
  symbol: string
  name: string
  type: string
}

export interface AssetBalance extends Balance {
  onHold: number
  available: number
  numberFormat: NumberFormat
}
