import { NumberFormat } from './util'
import { PaginationArgs } from 'services/api/types'
import { AssetType } from 'types/asset'
import User from './user'

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
  _id?: string
  onHold: number
  available: number
  numberFormat: NumberFormat
}
export interface ConvertedAssetBalance {
  _id?: string
  status: string
  accountNumber: string
  currency: 'USD' | 'SGD'
  user: User
  balance: {
    available: number
    onHold: number
    outstanding: number
    usdValue: number
    sgdValue: number
  }
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
