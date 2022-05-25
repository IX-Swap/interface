import { OTCMarket } from 'types/market'
import {
  OTCMatch,
  OTCOrder,
  OTCOrderStatus,
  OTCParticipant
} from 'types/otcOrder'

const fakeOTCMarket: OTCMarket = {
  createdAt: '2022-05-10T12:45:07.411Z',
  isOtc: true,
  listing: '609d1d93c54af74af46c027c',
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
  identity: {
    individual: seller
  },
  status: OTCOrderStatus.MATCH
}

const fakeOTCMatch1: OTCMatch = {
  _id: '609d1d93c54af74af46c027d',
  order: '609d1d93c54af74af46c027c',
  user: '609d1d93c54af74af46c027c',
  ethAddress: '0x65901b9cFb0C4fD87aD09181a23D53d1d728F1b1',
  matchedAmount: 1,
  identity: {
    individual: seller
  },
  status: OTCOrderStatus.PENDING
}

export const orders: OTCOrder[] = [
  {
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
  },
  {
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
  },
  {
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
]
