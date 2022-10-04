import { AuthorizableStatus } from './util'
import { DataroomFile } from './dataroomFile'
import { AppFeature } from 'types/app'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'

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

export interface AuthorizationOverride {
  _id: string
  authorizer: string
  withdrawalAddress?: string
  releaseDate?: string
  timestamp: string
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
  assignedAt?: string
}

export interface AuthorizableWithIdentity extends Authorizable {
  identity?: {
    individual: IndividualIdentity
    corporates: CorporateIdentity[]
  }
}

export const DataroomFeature = {
  [AppFeature.BankAccounts]: 'authorization/accounts/bank-accounts',
  [AppFeature.CashDeposits]: 'authorization/accounts/deposits',
  [AppFeature.CashWithdrawals]: 'authorization/accounts/withdrawals',
  [AppFeature.DigitalSecurityWithdrawals]:
    'authorization/accounts/security-withdrawals',
  [AppFeature.WithdrawalAddresses]:
    'authorization/accounts/withdrawal-addresses',
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

export interface Authorization {
  authorizer?: string
}
