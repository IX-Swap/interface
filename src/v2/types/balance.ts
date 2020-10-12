import { NumberFormat } from './util'
import { PaginationArgs } from 'v2/services/api/types'
import { AssetType } from 'v2/types/asset'

export interface Balance {
  _id: string
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

export interface GetBalanceByAssetIdArgs extends PaginationArgs {
  assetId: string
  userId: string
}

export interface GetBalanceByTypeArgs extends PaginationArgs {
  userId: string
  type: AssetType
}

export interface GetAllBalancesArgs extends PaginationArgs {
  userId: string
}
