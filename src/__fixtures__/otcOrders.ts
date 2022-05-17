import {
  MatchedOTCOrder,
  OTCOrder,
  OTCOrderStatus,
  OTCParticipant,
  UnmatchedOTCOrder
} from 'types/otcOrder'

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

export const buyer: OTCParticipant = {
  userId: '623c3df86870580e1d878623',
  identityId: '623c3fa56870580e1d878931',
  identityType: 'corporate',
  name: 'Test Company',
  phoneNumber: '+373 (60) 39-99-94'
}

export const seller: OTCParticipant = {
  userId: '6239cf13b14ef00e196a179b',
  identityId: '6239cf50b14ef00e196a1854',
  identityType: 'individual',
  name: 'Fredericka Middle Erickson',
  phoneNumber: '+1 (302) 246-2220'
}

export const matchedOrders: MatchedOTCOrder[] = [
  {
    _id: '609d1d93c54af74af46c027e',
    createdAt: '2022-05-10T12:45:07.411Z',
    pair: 'IX-APE/USD',
    buyer,
    seller,
    price: 8500,
    amount: 1,
    status: OTCOrderStatus.MATCH
  },
  {
    _id: '609d1d93c54af74af46c027f',
    createdAt: '2022-05-13T12:41:07.411Z',
    pair: 'IX-APE/USD',
    buyer,
    seller,
    price: 850,
    amount: 1,
    status: OTCOrderStatus.IN_TRANSFER
  },
  {
    _id: '609d1d93c54af74af46c027a',
    createdAt: '2022-05-14T12:40:07.411Z',
    pair: 'IX-APE/USD',
    buyer,
    seller,
    price: 500,
    amount: 1,
    status: OTCOrderStatus.COMPLETED
  }
]

export const unmatchedBuyOrders: UnmatchedOTCOrder[] = [
  {
    _id: '609d1d93c54af74af46c027e',
    pair: 'IX-APE/USD',
    user: buyer,
    price: 8500,
    amount: 1,
    orderType: 'BUY'
  },
  {
    _id: '609d1d93c54af74af46c027a',
    pair: 'IX-APE/USD',
    user: buyer,
    price: 8500,
    amount: 5,
    orderType: 'BUY'
  },
  {
    _id: '609d1d93c54af74af46c027b',
    pair: 'IX-APE/USD',
    user: buyer,
    price: 10.9,
    amount: 12,
    orderType: 'BUY'
  },
  {
    _id: '609d1d93c54af74af46c027c',
    pair: 'IX-APE/USD',
    user: buyer,
    price: 12.1,
    amount: 10,
    orderType: 'BUY'
  },
  {
    _id: '609d1d93c54af74af46c027d',
    pair: 'IX-APE/USD',
    user: buyer,
    price: 8500,
    amount: 1,
    orderType: 'BUY'
  },
  {
    _id: '609d1d93c54af74af46c0271',
    pair: 'IX-APE/USD',
    user: buyer,
    price: 8500,
    amount: 1,
    orderType: 'BUY'
  }
]

export const unmatchedSellOrders: UnmatchedOTCOrder[] = [
  {
    _id: '609d1d93c54af74af46c027e',
    pair: 'IX-APE/USD',
    user: seller,
    price: 8500,
    amount: 1,
    orderType: 'SELL'
  },
  {
    _id: '609d1d93c54af74af46c027a',
    pair: 'IX-APE/USD',
    user: seller,
    price: 8500,
    amount: 5,
    orderType: 'SELL'
  },
  {
    _id: '609d1d93c54af74af46c027b',
    pair: 'IX-APE/USD',
    user: seller,
    price: 10.9,
    amount: 12,
    orderType: 'SELL'
  },
  {
    _id: '609d1d93c54af74af46c027c',
    pair: 'IX-APE/USD',
    user: seller,
    price: 12.1,
    amount: 10,
    orderType: 'SELL'
  },
  {
    _id: '609d1d93c54af74af46c027d',
    pair: 'IX-APE/USD',
    user: seller,
    price: 8500,
    amount: 1,
    orderType: 'SELL'
  },
  {
    _id: '609d1d93c54af74af46c0271',
    pair: 'IX-APE/USD',
    user: seller,
    price: 8500,
    amount: 1,
    orderType: 'SELL'
  }
]
