import { Asset } from './asset'
import { CorporateIdentity, IndividualIdentity } from './identity'
import User from './user'
import { AuthorizableStatus } from './util'
import { AuthorizableWithIdentity } from './authorizer'
import { DataroomFile } from './dataroomFile'

export interface Address {
  line1: string
  line2?: string
  city: string
  state: string
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
  supportingDocuments: DataroomFile[]
  user: User
}
