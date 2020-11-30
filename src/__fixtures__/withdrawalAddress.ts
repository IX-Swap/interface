import { WithdrawalAddress } from 'types/withdrawalAddress'
import { individual, corporate } from './identity'
import { network } from './network'

export const withdrawalAddress: WithdrawalAddress = {
  _id: 'id123',
  status: 'Approved',
  address: '0x67ed490d810c41263758e7355cef720ffed68cbc',
  identity: { individual, corporates: [corporate] },
  label: 'test label',
  network: network,
  memo: 'test memo',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000'
}
