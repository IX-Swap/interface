import { Asset } from './asset'

export interface Listing {
  _id: string
  deleted: boolean
  createdBy: string
  name: string
  asset: Asset
  description: string
  companyName: string
  explorer: string
  createdAt: string
  updatedAt: string
}
