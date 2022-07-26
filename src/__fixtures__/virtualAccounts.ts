import { VirtualAccount } from 'types/virtualAccount'

export const virtualAccountsSample: VirtualAccount[] = [
  {
    _id: '608108b2f23f7412a9ba1cd0',
    accountNumber: '123456789012',
    currency: 'USD',
    assignedAt: '2021-04-27T04:21:57.383Z',
    user: {
      _id: '605d3c24fef70845f9be4cf1',
      enabled: true,
      verified: true,
      totpConfirmed: true,
      email: 't+1@investax.io',
      name: 'Christa Spencer',
      roles: 'admin,authorizer,user,issuer,accredited',
      createdAt: '2021-03-26T01:43:00.174Z',
      updatedAt: '2021-04-14T14:57:04.789Z'
    },
    balance: {
      available: 987654.321,
      onHold: 0,
      outstanding: 987654.321,
      sgdValue: 123,
      usdValue: 123
    },
    createdBy: '234',
    createdAt: '123',
    updatedAt: '123',
    status: 'Submitted',
    authorizations: []
  },
  {
    _id: '608108b8f23f7412a9ba1cd3',
    accountNumber: '000000000001',
    currency: 'SGD',
    assignedAt: '2021-04-27T04:21:39.139Z',
    user: {
      _id: '605d3c24fef70845f9be4cf1',
      enabled: true,
      verified: true,
      totpConfirmed: true,
      email: 't+1@investax.io',
      name: 'Christa Spencer',
      roles: 'admin,authorizer,user,issuer,accredited',
      createdAt: '2021-03-26T01:43:00.174Z',
      updatedAt: '2021-04-14T14:57:04.789Z'
    },
    balance: {
      available: 0,
      onHold: 0,
      outstanding: 0,
      sgdValue: 123,
      usdValue: 123
    },
    createdBy: '234',
    createdAt: '123',
    updatedAt: '123',
    status: 'Submitted',
    authorizations: []
  }
]
