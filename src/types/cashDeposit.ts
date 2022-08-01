import { AuthorizableStatus } from './util'
import { Asset } from './asset'
import { Bank } from './bank'
import { AuthorizableWithIdentity } from './authorizer'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'

export interface CashDeposit extends AuthorizableWithIdentity {
  _id: string
  status: AuthorizableStatus
  user: string
  amount: number
  asset: Asset
  depositCode: string
  createdAt: string
  updatedAt: string
  individual: IndividualIdentity
  corporates: CorporateIdentity[]
  type: string
  currency?: string
  bankAccount?: Bank
}
