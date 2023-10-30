import { NumberFormat } from './util'
import { PaginationArgs } from 'services/api/types'

export type AssetType = 'Currency' | 'Security'

export interface GetAssetsArgs extends PaginationArgs {
  type?: AssetType
  isDeployed?: boolean
}

export interface Asset {
  _id: string
  logo?: string
  deleted: boolean
  createdBy: string
  symbol: string
  name: string
  type: AssetType
  numberFormat: NumberFormat
  createdAt: string
  updatedAt: string
  description: any
  amounts?: {
    minimumDeposit?: number
    maximumDeposit?: number
    minimumWithdrawal?: number
    maximumWithdrawal?: number
  }
  network: {
    name: string
  }
}
