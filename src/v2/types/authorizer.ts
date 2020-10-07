import { AuthorizableStatus } from './util'
import { DataroomFile } from './dataroomFile'
import { CorporateIdentity, IndividualIdentity } from './identity'

export interface AuthorizationInfo {
  authorizer: string
  comment: string
  sharedWithUser: boolean
  timestamp: string
}

export interface AuthorizationInfoWithStatus extends AuthorizationInfo {
  _id: string
  status: AuthorizableStatus
}

export interface Authorizable {
  _id: string
  createdAt: string
  updatedAt: string
  status: AuthorizableStatus
  authorizations: AuthorizationInfoWithStatus[]
  authorizationDocuments?: DataroomFile[]
  authorization?: AuthorizationInfo
  level?: string
}

export interface AuthorizableWithIdentity extends Authorizable {
  identity?: {
    individual: IndividualIdentity
    corporates: CorporateIdentity[]
  }
}

export enum DataroomFeature {
  banks = 'authorization/accounts/bank-accounts',
  deposits = 'authorization/accounts/deposits',
  withdrawals = 'authorization/accounts/withdrawals',
  dsWithdrawals = 'authorization/accounts/security-withdrawals',
  individualIdentities = 'authorization/identity/individuals',
  corporateIdentities = 'authorization/identity/corporates',
  offerings = 'authorization/issuance/dsos',
  commitments = 'authorization/issuance/commitments'
}

export interface AuthorizerViewParams {
  category: keyof typeof DataroomFeature
  itemId: string
  ownerId: string
}
