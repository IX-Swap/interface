import { Network } from './networks'
import { IndividualIdentity, CorporateIdentity } from './identity'

export interface WithdrawalAddress {
  label: string
  address: string
  network: Network
  memo?: string
  identity: {
    individual: IndividualIdentity
    corporates: CorporateIdentity[]
  }
}

export interface WithdrawalAddressFormValues {
  label: WithdrawalAddress['label']
  address: WithdrawalAddress['address']
  network: Network['_id']
  memo?: WithdrawalAddress['memo']
  agree?: boolean
}

export interface MakeWithdrawalAddressArgs
  extends Omit<WithdrawalAddressFormValues, 'agree'> {}
