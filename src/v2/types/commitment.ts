import { Dso } from './dso'
import { Asset } from './asset'
import { CorporateIdentity, IndividualIdentity } from './identity'

export interface Commitment {
  _id: string
  status: string
  createdBy: string
  dso: Dso
  currency: Asset
  walletAddress: string
  numberOfUnits: number
  pricePerUnit: number
  totalAmount: number
  hold: string
  createdAt: string
  updatedAt: string
  signedSubscriptionDocument: string
  individual: IndividualIdentity
  corporates: CorporateIdentity[]
}
