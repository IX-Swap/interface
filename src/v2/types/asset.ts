import { NumberFormat } from './util'
import { AssetType } from 'v2/services/assets/types'

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
