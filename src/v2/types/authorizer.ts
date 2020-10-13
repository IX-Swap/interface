import { AuthorizableStatus } from './util'
import { DataroomFile } from './dataroomFile'
import { CorporateIdentity, IndividualIdentity } from './identity'
import { AppFeature } from 'v2/types/app'

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

export const DataroomFeature = {
  [AppFeature['Bank Accounts']]: 'authorization/accounts/bank-accounts',
  [AppFeature['Cash Deposits']]: 'authorization/accounts/deposits',
  [AppFeature['Cash Withdrawals']]: 'authorization/accounts/withdrawals',
  [AppFeature['Digital Security Withdrawals']]:
    'authorization/accounts/security-withdrawals',
  [AppFeature.Individuals]: 'authorization/identity/individuals',
  [AppFeature.Corporates]: 'authorization/identity/corporates',
  [AppFeature.Offerings]: 'authorization/issuance/dsos',
  [AppFeature.Commitments]: 'authorization/issuance/commitments'
}

export interface AuthorizerViewParams {
  category: keyof typeof DataroomFeature
  itemId: string
  ownerId: string
}
