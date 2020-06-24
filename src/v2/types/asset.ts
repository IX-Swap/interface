import { NumberFormat } from './util'

export interface Asset {
  _id: string
  deleted: boolean
  createdBy: string
  symbol: string
  name: string
  type: string // TODO: update to securities, currency, etc
  numberFormat: NumberFormat
  createdAt: string
  updatedAt: string
}
