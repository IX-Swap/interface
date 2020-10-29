import { DigitalSecurityOffering } from './dso'
import { Asset } from './asset'
import { CorporateIdentity, IndividualIdentity } from './identity'
import { Authorizable } from 'v2/types/authorizer'
import User from 'v2/types/user'
import { DataroomFile } from 'v2/types/dataroomFile'

export interface Commitment extends Authorizable {
  _id: string
  createdBy: string
  dso: DigitalSecurityOffering
  currency: Asset
  walletAddress: string
  numberOfUnits: number
  pricePerUnit: number
  totalAmount: number
  hold: string
  createdAt: string
  updatedAt: string
  signedSubscriptionDocument: DataroomFile
  user: User
  identity: {
    individual: IndividualIdentity
    corporates: CorporateIdentity[]
  }
}

export interface CommitmentFormValues {
  totalAmount: Commitment['totalAmount']
  pricePerUnit: Commitment['pricePerUnit']
  numberOfUnits: Commitment['numberOfUnits']
  walletAddress: Commitment['walletAddress']
  signedSubscriptionDocument: DataroomFile
  otp: string
}

export interface MakeInvestmentArgs {
  dso: string
  signedSubscriptionDocument: string
  currency: string
  walletAddress: string
  numberOfUnits: number
  otp: string
}
