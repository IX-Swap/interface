import { Asset } from './asset'
import { Listing } from './listing'

export interface Market {
  _id: string
  deleted: boolean
  createdBy: string
  name: string
  listing: Listing
  quote: Asset
}

export interface OTCMarket {
  createdAt: string
  isOtc: boolean
  listing: string
  name: string
  quote: string
  updatedAt: string
  _id: string
}
