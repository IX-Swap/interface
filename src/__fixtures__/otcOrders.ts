import { OTCOrder, OTCOrderStatus } from 'types/otcOrder'

export const orders: OTCOrder[] = [
  {
    _id: '609d1d93c54af74af46c027c',
    createdAt: '2022-05-10T12:45:07.411Z',
    pair: 'IX-APE/USD',
    orderType: 'SELL',
    price: 8500,
    amount: 1,
    status: OTCOrderStatus.CONFIRMED,
    ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1'
  },
  {
    _id: '609d1d93c54af74af46c027d',
    createdAt: '2022-05-10T12:46:07.411Z',
    pair: 'IX-APE/USD',
    orderType: 'BUY',
    price: 8500,
    amount: 1,
    status: OTCOrderStatus.CONFIRMED,
    ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1'
  },
  {
    _id: '609d1d93c54af74af46c027e',
    createdAt: '2022-05-10T12:47:07.411Z',
    pair: 'IX-APE/USD',
    orderType: 'SELL',
    price: 8500,
    amount: 1,
    status: OTCOrderStatus.MATCH,
    ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1'
  }
]
