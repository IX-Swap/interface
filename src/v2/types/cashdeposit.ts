import { AuthorizableStatus } from './util'
import { Asset } from './asset'
import { IndividualIdentity, CorporateIdentity } from './identity'
import { Bank } from './bank'

export interface CashDeposit{
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
  bankAccount?: Bank
}
