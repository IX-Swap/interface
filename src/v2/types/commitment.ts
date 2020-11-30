import { DigitalSecurityOffering } from './dso'
import { Asset } from './asset'
import { CorporateIdentity, IndividualIdentity } from './identity'
import { Authorizable, AuthorizationOverride } from 'v2/types/authorizer'
import User from 'v2/types/user'
import { DataroomFile } from 'v2/types/dataroomFile'
import { WithdrawalAddress } from './withdrawalAddress'

export interface Commitment extends Authorizable {
  _id: string
  createdBy: string
  dso: DigitalSecurityOffering
  currency: Asset
  withdrawalAddress?: WithdrawalAddress
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
  authorizationOverride?: AuthorizationOverride
  authorizationOverrides: AuthorizationOverride[]
}

export interface CommitmentFormValues {
  totalAmount: Commitment['totalAmount']
  pricePerUnit: Commitment['pricePerUnit']
  numberOfUnits: Commitment['numberOfUnits']
  withdrawalAddress?: string
  signedSubscriptionDocument: DataroomFile
  otp: string
}

export interface CommitmentIssuanceFormValues {
  releaseDate?: Date | null
  withdrawalAddress: string
}

export interface CommitmentIssuanceArgs {
  releaseDate?: string
  withdrawalAddress: string
}

export interface MakeInvestmentArgs {
  dso: string
  signedSubscriptionDocument: string
  currency: string
  withdrawalAddress?: string
  numberOfUnits: number
  otp: string
}
