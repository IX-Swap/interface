import {
  AccountInfo,
  ActivitySummary,
  CashReports,
  Dividend,
  OpenPositionItem,
  OpenPositionsTotal,
  TradeItem
} from 'types/reports'

export const fakeAccountInfo: AccountInfo = {
  name: 'Thi Nguyen',
  accountType: 'Invididual',
  customerType: 'Individual',
  basedCurrency: {
    virtualAccount: '60d41b15695e8c352f46a599',
    currency: 'USD'
  },
  date: '2021-11-23T11:01:14.920Z'
}

export const fakeOpenPositionItem: OpenPositionItem = {
  _id: '617f85f33558188dbcd50723',
  type: 'BUY',
  side: 'BID',
  price: 2000,
  amount: 3,
  date: '2021-11-01T06:15:15.824Z',
  pair: 'RHTC/SGD',
  pairId: '6119f6c578df6a9a1d50f719',
  total: 6000,
  filled: 3,
  filledPercent: 100,
  average: 2000,
  status: 'FILLED',
  timeInForce: 'Good till cancel',
  name: 'RHTC',
  unrealizedPnl: 0,
  costValue: 6000,
  lastTradePrice: 2000,
  currentValue: 6000
}

export const fakeOpenPositionsTotal: OpenPositionsTotal = {
  totalCostPrice: 5033,
  totalCurrentValue: 146000,
  totalUnrealizedPnl: -79835
}

export const fakeCashReports: CashReports = {
  _id: '60c9713c6b8a1d7ce5816df3',
  currency: 'USD',
  startingCash: 0,
  fees: 0,
  withdrawals: 0,
  endingCash: 0
}

export const fakeActivitySummary: ActivitySummary = {
  openPositions: [fakeOpenPositionItem],
  openPositionsTotal: fakeOpenPositionsTotal,
  cashReports: [fakeCashReports]
}

export const fakeTradeItem: TradeItem = {
  _id: '60b072815b5ae5da2c5e2aba',
  price: 10,
  createdAt: '2021-05-28T04:33:05.332Z',
  pair: 'HKUV/SGD',
  quantity: 10,
  total: 100,
  fee: 0,
  type: 'SELL'
}

export const fakeFeeAndCharges = {
  usd: [],
  totalUsd: 0,
  sgd: [
    {
      _id: '61a42c39347c8f6c19d00cb8',
      user: '60731869332485e38ae74ca1',
      amount: 10,
      description: 'Primary issuance fee',
      currency: 'SGD',
      createdAt: '2021-11-29T01:26:17.997Z',
      updatedAt: '2021-11-29T01:26:17.997Z',
      __v: 0
    }
  ],
  totalSgd: 10
}

export const fakeDividend: Dividend = {
  _id: '618b3ce8d37a1612e25e323f',
  currency: 'SGD',
  createdAt: '2021-11-10T03:30:48.692Z',
  dividendPerShare: 1,
  numberOfToken: 1000,
  totalAmount: 1000,
  tokenSymbol: 'HEHEHI'
}
