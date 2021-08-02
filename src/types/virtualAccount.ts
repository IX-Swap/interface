import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { AuthorizationInfoWithStatus } from 'types/authorizer'
import { AuthorizableStatus } from 'types/util'

export interface VirtualAccount {
  _id: string
  accountNumber: string
  currency: 'SGD' | 'USD'
  balance: {
    available: number
    onHold: number
    outstanding: number
  }
  createdBy: string
  user: {
    _id: string
    enabled: boolean
    verified: boolean
    totpConfirmed: boolean
    name: string
    email: string
    roles: string
    createdAt: string
    updatedAt: string
  }
  createdAt: string
  assignedAt: string
  updatedAt: string
  status: AuthorizableStatus
  authorizations: AuthorizationInfoWithStatus[]
  identity?: {
    individual: IndividualIdentity
    corporates: CorporateIdentity[]
  }
}
