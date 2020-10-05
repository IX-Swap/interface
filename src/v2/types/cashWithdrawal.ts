import { AuthorizableStatus } from './util'
import { Asset } from './asset'
import { IndividualIdentity, CorporateIdentity } from './identity'
import { Bank } from './bank'
import { AuthorizableWithIdentity } from './authorizer'

export interface CashWithdrawal extends AuthorizableWithIdentity {
  _id: string
  status: AuthorizableStatus
  user: string
  amount: number
  bank: string
  asset: Asset
  hold: string
  memo?: string
  corporates: CorporateIdentity[]
  individual: IndividualIdentity
  bankAccount: Bank
  level: string
  createdAt: string
  updatedAt: string
}
