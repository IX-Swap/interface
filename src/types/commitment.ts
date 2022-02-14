import { DigitalSecurityOffering } from './dso'
import { Asset } from './asset'
import { Authorizable, AuthorizationOverride } from 'types/authorizer'
import User from 'types/user'
import { DataroomFile } from 'types/dataroomFile'
import { WithdrawalAddress } from './withdrawalAddress'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { FundStatus } from 'types/util'

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
  fundStatus: FundStatus
}

export interface CommitmentFormValues {
  totalAmount?: Commitment['totalAmount']
  pricePerUnit?: Commitment['pricePerUnit']
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
  dso?: string
  signedSubscriptionDocument: string
  currency: string
  withdrawalAddress?: string
  numberOfUnits: number
  otp: string
}
