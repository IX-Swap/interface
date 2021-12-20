import { Network } from './networks'
import { AuthorizableWithIdentity } from './authorizer'
import { BlockchainWallet } from 'config/blockchain'

export interface WithdrawalAddress extends AuthorizableWithIdentity {
  _id: string
  label: string
  address: string
  network: Network
  wallet?: BlockchainWallet
  memo?: string
}

export type BlockchainAddressVariant = 'connect' | 'create'

export interface WithdrawalAddressFormValues {
  label: WithdrawalAddress['label']
  address: WithdrawalAddress['address']
  network: Network['_id']
  memo?: WithdrawalAddress['memo']
  agree?: boolean
  wallet?: BlockchainWallet
}

export interface MakeWithdrawalAddressArgs
  extends Omit<WithdrawalAddressFormValues, 'agree'> {}
