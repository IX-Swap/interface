import { AuthorizableStatus } from './util'
import { Asset } from './asset'
import { Bank } from './bank'
import { AuthorizableWithIdentity } from './authorizer'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { VirtualAccount } from 'types/virtualAccount'

export interface CashWithdrawal extends AuthorizableWithIdentity {
  _id: string
  status: AuthorizableStatus
  user: string
  amount: number
  asset: Asset
  hold: string
  memo?: string
  corporates: CorporateIdentity[]
  individual: IndividualIdentity
  bank: Bank
  level: string
  createdAt: string
  updatedAt: string
  virtualAccount: VirtualAccount
  paymentMethodName?: string
  currency?: string
}
