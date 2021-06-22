import { Asset } from './asset'
import { AuthorizableWithIdentity } from './authorizer'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'

export interface DSWithdrawal extends AuthorizableWithIdentity {
  _id: string
  user: string
  amount: number
  asset: Asset
  hold: string
  memo?: string
  recipientWallet: string
  identity: {
    corporates: CorporateIdentity[]
    individual: IndividualIdentity
  }
  level: string
  createdAt: string
  updatedAt: string
  transaction: string
}
