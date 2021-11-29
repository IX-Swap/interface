import { AccountInfo } from 'types/reports'

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

export const fakeActivitySummary = {
  openPositions: [
    {
      totalFilled: 0,
      _id: '6177cc78a75869553bcdc1fe',
      pair: {
        _id: '6107717ebb48af392c948cf7',
        listing: '61077150bb48af392c948cf2',
        name: 'RHTC/SGD',
        quote: '5fd7199deb87068672a27015',
        createdAt: '2021-08-02T04:15:58.783Z',
        updatedAt: '2021-08-02T04:15:58.783Z',
        __v: 0
      },
      side: 'BID',
      price: 11,
      amount: 10,
      createdAt: '2021-10-26T09:38:00.844Z',
      type: 'BUY',
      unrealizedPnl: -15,
      costValue: 110,
      lastTradePrice: 12.5,
      currentValue: 125
    },
    {
      totalFilled: 0,
      _id: '6125c319f03baa1b2c7481ed',
      pair: {
        _id: '6107717ebb48af392c948cf7',
        listing: '61077150bb48af392c948cf2',
        name: 'RHTC/SGD',
        quote: '5fd7199deb87068672a27015',
        createdAt: '2021-08-02T04:15:58.783Z',
        updatedAt: '2021-08-02T04:15:58.783Z',
        __v: 0
      },
      side: 'BID',
      price: 7,
      amount: 10,
      createdAt: '2021-08-25T04:12:09.889Z',
      type: 'BUY',
      unrealizedPnl: -55,
      costValue: 70,
      lastTradePrice: 12.5,
      currentValue: 125
    }
  ],
  openPositionsTotal: {
    totalCostPrice: 18,
    totalCurrentValue: 250
  },
  cashReports: [
    {
      _id: '60d41b15695e8c352f46a599',
      currency: 'USD',
      startingCash: 92000000,
      fees: 0,
      withdrawals: 0,
      endingCash: 92000000
    },
    {
      _id: '60d42f2af64e0a47346a4fee',
      currency: 'SGD',
      startingCash: 10050080,
      fees: 0,
      withdrawals: 0,
      endingCash: 10050080
    }
  ]
}

export const fakeExchangeFill = {
  _id: '6177cae6a75869553bcdc07c',
  pair: {
    _id: '6107717ebb48af392c948cf7',
    listing: '61077150bb48af392c948cf2',
    name: 'RHTC/SGD',
    quote: '5fd7199deb87068672a27015',
    createdAt: '2021-08-02T04:15:58.783Z',
    updatedAt: '2021-08-02T04:15:58.783Z',
    __v: 0
  },
  side: 'BID',
  price: 12.5,
  amount: 50,
  createdAt: '2021-10-26T09:31:18.696Z',
  id: '6177cae6a75869553bcdc07c'
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

export const fakeDividend = {
  _id: '618b3ce8d37a1612e25e323f',
  currency: 'SGD',
  createdAt: '2021-11-10T03:30:48.692Z',
  dividendPerShare: 1,
  numberOfToken: 1000,
  totalAmount: 1000,
  tokenSymbol: 'HEHEHI'
}
