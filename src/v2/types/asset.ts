import { NumberFormat } from './util'
import { PaginationArgs } from 'v2/services/api/types'

export type AssetType = 'Currency' | 'Security'

export interface GetAssetsArgs extends PaginationArgs {
  type: AssetType
}

export interface Asset {
  _id: string
  deleted: boolean
  createdBy: string
  symbol: string
  name: string
  type: AssetType
  numberFormat: NumberFormat
  createdAt: string
  updatedAt: string
  description: any
}
