import { Network } from './networks'
import { AuthorizableWithIdentity } from './authorizer'

export interface WithdrawalAddress extends AuthorizableWithIdentity {
  _id: string
  label: string
  address: string
  network: Network
  memo?: string
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
