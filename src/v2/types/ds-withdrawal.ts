import { AuthorizableStatus } from './util'
import { Asset } from './asset'
import { IndividualIdentity, CorporateIdentity } from './identity'

export interface DSWithdrawal {
  _id: string
  status: AuthorizableStatus
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
