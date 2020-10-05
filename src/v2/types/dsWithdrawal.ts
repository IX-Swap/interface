import { Asset } from './asset'
import { IndividualIdentity, CorporateIdentity } from './identity'
import { Authorizable, AuthorizableWithIdentity } from './authorizer'

export interface DSWithdrawal extends AuthorizableWithIdentity {
  _id: string
  user: string
  amount: number
  asset: Asset
  hold: string
  memo?: string
  recipientWallet: string
  corporates: CorporateIdentity[]
  individual: IndividualIdentity
  level: string
  createdAt: string
  updatedAt: string
}
