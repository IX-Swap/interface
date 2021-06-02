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
