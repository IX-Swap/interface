import { VirtualAccount, VirtualAccountBalances } from 'types/virtualAccount'
import { managedUser } from '__fixtures__/user'

export const virtualAccount: VirtualAccount = {
  _id: '608108b8f23f7412a9ba1cd3',
  createdBy: '605d3c24fef70845f9be4cf1',
  accountNumber: '000000000001',
  currency: 'SGD',
  createdAt: '2021-04-22T05:25:12.647Z',
  updatedAt: '2021-04-27T04:21:39.140Z',
  assignedAt: '2021-04-27T04:21:39.139Z',
  balance: {
    available: 123,
    onHold: 235,
    outstanding: 123
  },
  user: managedUser,
  status: 'Submitted',
  authorizations: []
}

export const assignedVirtualAccount: VirtualAccount = {
  user: managedUser,
  accountNumber: '0000001',
  currency: 'SGD',
  balance: {
    available: 10000,
    onHold: 1000,
    outstanding: 1000
  },
  createdAt: '2021-04-22T05:25:12.647Z',
  updatedAt: '2021-04-27T04:21:39.140Z',
  assignedAt: '2021-04-27T04:21:39.139Z',
  _id: '608108b8f23f7412a9ba1cd3',
  createdBy: '605d3c24fef70845f9be4cf1',
  status: 'Submitted',
  authorizations: []
}

export const fakeVirtualAccountBalances: VirtualAccountBalances = {
  availableBalance: 12000000,
  primaryInvestmentBalance: 0,
  secondaryInvestmentBalance: 0,
  totalAssetBalance: 12000000,
  withdrawalAddressCount: 1
}
