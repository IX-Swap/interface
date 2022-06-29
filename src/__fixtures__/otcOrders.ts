import { OTCMarket } from 'types/market'
import {
  CreateOTCOrderArgs,
  OpenOTCOrder,
  OTCMatch,
  OTCOrder,
  OTCOrderStatus,
  OTCParticipant
} from 'types/otcOrder'
import { dso } from '__fixtures__/issuance'

export const fakeOTCMarket: OTCMarket = {
  createdAt: '2022-05-10T12:45:07.411Z',
  isOtc: true,
  dso,
  name: 'IX-APE/USD',
  quote: '609d1d93c54af74af46c027c',
  updatedAt: '2022-05-10T12:45:07.411Z',
  _id: '609d1d93c54af74af46c027c'
}
export const buyer: OTCParticipant = {
  _id: '623c3df86870580e1d878623',
  companyLegalName: 'Test Company',
  contactNumber: '+373 (60) 39-99-94'
}

export const seller: OTCParticipant = {
  _id: '6239cf13b14ef00e196a179b',
  firstName: 'Fredericka',
  middleName: 'Middle',
  lastName: 'Erickson',
  contactNumber: '+1 (302) 246-2220'
}

const fakeOTCMatch: OTCMatch = {
  _id: '609d1d93c54af74af46c027d',
  order: '609d1d93c54af74af46c027c',
  user: '609d1d93c54af74af46c027c',
  ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1',
  matchedAmount: 1,
  matchedPrice: 10,
  identity: {
    individual: seller
  },
  status: OTCOrderStatus.MATCH
}

export const fakeOTCMatch1: OTCMatch = {
  _id: '609d1d93c54af74af46c027d',
  order: '609d1d93c54af74af46c027c',
  user: '609d1d93c54af74af46c027c',
  ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1',
  matchedAmount: 1,
  matchedPrice: 10,
  identity: {
    individual: seller
  },
  status: OTCOrderStatus.PENDING
}
const fakeOTCMatch2: OTCMatch = {
  _id: '609d1d93c54af74af46c027d',
  order: '609d1d93c54af74af46c027c',
  user: '609d1d93c54af74af46c027c',
  ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1',
  matchedAmount: 1,
  matchedPrice: 10,
  identity: {
    individual: seller
  },
  status: OTCOrderStatus.CONFIRMED
}
export const order1: OTCOrder = {
  _id: '609d1d93c54af74af46c027c',
  createdAt: '2022-05-10T12:45:07.411Z',
  pair: fakeOTCMarket,
  orderType: 'SELL',
  price: 8500,
  amount: 1,
  availableAmount: 1,
  user: '1234',
  status: OTCOrderStatus.CONFIRMED,
  ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1',
  matches: fakeOTCMatch
}
export const order1Open: OpenOTCOrder = {
  ...order1,
  matches: [fakeOTCMatch]
}
export const order2: OTCOrder = {
  _id: '609d1d93c54af74af46c027d',
  createdAt: '2022-05-10T12:46:07.411Z',
  pair: fakeOTCMarket,
  orderType: 'BUY',
  price: 8500,
  availableAmount: 1,
  amount: 5,
  user: '1234',
  matches: fakeOTCMatch1,
  status: OTCOrderStatus.CONFIRMED,
  ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1'
}
export const order2Open: OpenOTCOrder = {
  ...order2,
  matches: [fakeOTCMatch1]
}

export const order3: OTCOrder = {
  _id: '609d1d93c54af74af46c027e',
  createdAt: '2022-05-10T12:47:07.411Z',
  pair: fakeOTCMarket,
  orderType: 'SELL',
  availableAmount: 1,
  price: 8500,
  user: '1234',
  amount: 1,
  status: OTCOrderStatus.MATCH,
  ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1'
}

export const order3Open: OpenOTCOrder = {
  ...order3,
  matches: []
}

export const order3Buy: OpenOTCOrder = {
  ...order3,
  orderType: 'BUY',
  matches: [fakeOTCMatch]
}
export const order4: OTCOrder = {
  _id: '609d1d93c54af74af46c028a',
  createdAt: '2022-05-10T12:47:07.411Z',
  pair: fakeOTCMarket,
  orderType: 'SELL',
  availableAmount: 1,
  identity: {
    individual: {
      _id: '46677',
      firstName: 'A',
      lastName: 'B',
      middleName: 'C',
      companyLegalName: 'ABT',
      contactNumber: '43245'
    }
  },
  price: 8500,
  user: '1234',
  matches: fakeOTCMatch2,
  amount: 1,
  status: OTCOrderStatus.MATCH,
  ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1'
}

export const order4Open: OpenOTCOrder = {
  ...order4,
  matches: [fakeOTCMatch2]
}
export const orders: OpenOTCOrder[] = [
  order1Open,
  order2Open,
  order3Open,
  order4Open
]
export const sortedOrders: OpenOTCOrder[] = [
  order4Open,
  order1Open,
  order2Open,
  order3Open
]

export const validOTCOrderData: CreateOTCOrderArgs = {
  orderType: 'SELL',
  price: 5,
  amount: 1,
  ethAddress: '12345',
  pair: 'IX-APE'
}

export const invalidOTCOrderData: CreateOTCOrderArgs = {
  ...validOTCOrderData,
  price: 0
}

export const invalidFloatingPointAmount: CreateOTCOrderArgs = {
  ...invalidOTCOrderData,
  price: 1,
  amount: 1.1
}
export const transformedOTCOrderArgs = {
  amount: 230,
  price: 33,
  ethAddress: '5435435',
  orderType: 'SELL',
  pair: '12'
}
