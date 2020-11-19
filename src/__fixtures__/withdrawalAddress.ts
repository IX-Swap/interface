import { WithdrawalAddress } from 'v2/types/withdrawalAddress'
import { individual, corporate } from './identity'
import { network } from './network'

export const withdrawalAddress: WithdrawalAddress = {
  _id: 'id123',
  address: '0x67ed490d810c41263758e7355cef720ffed68cbc',
  identity: { individual: individual, corporates: [corporate] },
  label: 'test label',
  network: network,
  memo: 'test memo'
}
