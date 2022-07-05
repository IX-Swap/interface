import { Asset } from './asset'
import User from './user'
import { AuthorizableWithIdentity } from './authorizer'

export interface Address {
  line1: string
  line2?: string
  city: string
  state?: string
  country: string
  postalCode: string
}

export interface Bank extends AuthorizableWithIdentity {
  _id: string
  deleted: boolean
  bankName: string
  bankAccountNumber: string
  accountHolderName: string
  swiftCode: string
  authorized: boolean
  createdAt: string
  updatedAt: string
  address: Address
  currency: Asset
  user: User
}
