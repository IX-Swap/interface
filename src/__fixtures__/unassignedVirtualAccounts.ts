import { VirtualAccount } from 'types/virtualAccount'

export const fakeVirtualAccount: VirtualAccount = {
  _id: '605ccb9c8e092311818e5af9',
  accountNumber: '000000000121',
  currency: 'USD',
  balance: {
    available: 5000,
    onHold: 500,
    outstanding: 4500
  },
  createdBy: '605ccb9c8e092311818e5ae0',
  user: {
    _id: '605ccb9c8e092311818e5ae0',
    enabled: true,
    verified: false,
    totpConfirmed: false,
    name: 'Joy Zulauf',
    email: 'brionna_okeefe0@gmail.com',
    roles: 'admin',
    createdAt: '2021-03-14T16:59:00.000Z',
    updatedAt: '2021-03-14T16:59:00.000Z'
  },
  createdAt: '2021-03-23T16:59:59.000Z',
  assignedAt: '2021-03-23T16:59:59.000Z',
  updatedAt: '2021-03-25T17:42:52.481Z',
  status: 'Approved',
  authorizations: []
}
