export const state = {
  markets: ['IXPS:SGD', 'MASX:SGD', 'DTGOX:SGD', 'XHAD:SGD'],
  balances: {
    IXPS: 10000,
    SGD: 50000,
    MASX: 30000,
    DTGOX: 10000
  },
  'IXPS:SGD': {
    market: {
      logo: 'https://investax.io/assets/X_Icon.60c1b96f.svg',
      pair: 'IXPS:SGD',
      totalSupply: '100000000',
      base: 'IXPS',
      quote: 'SGD',
      symbol: '$',
      capitalStructure: 'EQUITY',
      companyLegalName: 'IC SG PTE LTD',
      price: 9,
      change: -1.2
    },
    trades: {
      market: [
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 },
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 }
      ],
      yours: [
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 },
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 }
      ]
    },
    orderbook: {
      ask: [
        { price: 10, amount: 212 },
        { price: 11, amount: 3526 },
        { price: 12, amount: 2342 },
        { price: 13, amount: 4526 },
        { price: 14, amount: 23424 },
        { price: 15, amount: 2253 }
      ],
      bid: [
        { price: 9, amount: 24 },
        { price: 8, amount: 251 },
        { price: 7, amount: 432 },
        { price: 6, amount: 52532 },
        { price: 5, amount: 44 },
        { price: 4, amount: 235 }
      ]
    },
    series: [
      {
        name: 'SGD',
        data: [13, 14, 18, 12, 19, 16, 15],
        dates: [
          '2020-04-19T00:00:00',
          '2020-04-21T01:30:00',
          '2020-04-22T02:30:00',
          '2020-04-23T03:30:00',
          '2020-04-24T04:30:00',
          '2020-04-25T05:30:00',
          '2020-04-26T06:30:00'
        ]
      }
    ]
  },
  'MASX:SGD': {
    market: {
      logo:
        'https://media.glassdoor.com/sqll/529863/mas-squarelogo-1442306307661.png',
      pair: 'MASX:SGD',
      totalSupply: '15000000',
      base: 'MASX',
      quote: 'SGD',
      symbol: '$',
      capitalStructure: 'EQUITY',
      companyLegalName: 'MAYFIELD ASSETS FUND PTE LTD',
      price: 29.01,
      change: 1.4
    },
    trades: {
      market: [
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 }
      ],
      yours: [
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 }
      ]
    },
    orderbook: {
      ask: [
        { price: 10, amount: 212 },
        { price: 11, amount: 3526 },
        { price: 12, amount: 2342 },
        { price: 13, amount: 4526 },
        { price: 14, amount: 23424 },
        { price: 15, amount: 2253 }
      ],
      bid: [
        { price: 9, amount: 24 },
        { price: 8, amount: 251 },
        { price: 7, amount: 432 },
        { price: 6, amount: 52532 },
        { price: 5, amount: 44 },
        { price: 4, amount: 235 }
      ]
    },
    series: [
      {
        name: 'SGD',
        data: [31, 40, 28, 51, 42, 109, 100],
        dates: [
          '2020-04-19T00:00:00',
          '2020-04-21T01:30:00',
          '2020-04-22T02:30:00',
          '2020-04-23T03:30:00',
          '2020-04-24T04:30:00',
          '2020-04-25T05:30:00',
          '2020-04-26T06:30:00'
        ]
      }
    ]
  },
  'DTGOX:SGD': {
    market: {
      logo:
        'https://www.thairath.co.th/media/4DQpjUtzLUwmJZY57mHGM111gQh3QZCUBKnabqN5Mwrf.jpg',
      pair: 'DTGO:SGD',
      totalSupply: '70000000',
      base: 'DTGO',
      quote: 'SGD',
      symbol: '$',
      capitalStructure: 'DEBT',
      companyLegalName: 'DTGO CORP INC',
      price: 5.33,
      change: 3.2
    },
    trades: {
      market: [
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 }
      ],
      yours: [
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 }
      ]
    },
    orderbook: {
      ask: [
        { price: 10, amount: 212 },
        { price: 11, amount: 3526 },
        { price: 12, amount: 2342 },
        { price: 13, amount: 4526 },
        { price: 14, amount: 23424 },
        { price: 15, amount: 2253 }
      ],
      bid: [
        { price: 9, amount: 24 },
        { price: 8, amount: 251 },
        { price: 7, amount: 432 },
        { price: 6, amount: 52532 },
        { price: 5, amount: 44 },
        { price: 4, amount: 235 }
      ]
    },
    series: [
      {
        name: 'SGD',
        data: [24, 21, 10, 20, 25, 30, 24],
        dates: [
          '2020-04-19T00:00:00',
          '2020-04-21T01:30:00',
          '2020-04-22T02:30:00',
          '2020-04-23T03:30:00',
          '2020-04-24T04:30:00',
          '2020-04-25T05:30:00',
          '2020-04-26T06:30:00'
        ]
      }
    ]
  },
  'XHAD:SGD': {
    market: {
      logo:
        'https://fbcd.co/images/products/db0c92a614bfd6c31b75b14d0a3c1204_resize.png',
      pair: 'XHAD:SGD',
      totalSupply: '1000000',
      base: 'XHAD',
      quote: 'SGD',
      symbol: '$',
      capitalStructure: 'DEBT',
      companyLegalName: 'CHAD MANUFACTURING INC',
      price: 50.13,
      change: 3.2
    },
    trades: {
      market: [
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 }
      ],
      yours: [
        { time: '2020-04-19T00:00:00', price: 15, amount: 400 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 54000 },
        { time: '2020-04-19T00:00:00', price: 17, amount: 1000 },
        { time: '2020-04-19T00:00:00', price: 19, amount: 89000 },
        { time: '2020-04-19T00:00:00', price: 11, amount: 3000 },
        { time: '2020-04-19T00:00:00', price: 14, amount: 50000 },
        { time: '2020-04-19T00:00:00', price: 12, amount: 70000 }
      ]
    },
    orderbook: {
      ask: [
        { price: 10, amount: 212 },
        { price: 11, amount: 3526 },
        { price: 12, amount: 2342 },
        { price: 13, amount: 4526 },
        { price: 14, amount: 23424 },
        { price: 15, amount: 2253 }
      ],
      bid: [
        { price: 9, amount: 24 },
        { price: 8, amount: 251 },
        { price: 7, amount: 432 },
        { price: 6, amount: 52532 },
        { price: 5, amount: 44 },
        { price: 4, amount: 235 }
      ]
    },
    series: [
      {
        name: 'SGD',
        data: [50.23, 50.56, 52.34, 53.45, 50.34, 60.45, 59.2],
        dates: [
          '2020-04-19T00:00:00',
          '2020-04-21T01:30:00',
          '2020-04-22T02:30:00',
          '2020-04-23T03:30:00',
          '2020-04-24T04:30:00',
          '2020-04-25T05:30:00',
          '2020-04-26T06:30:00'
        ]
      }
    ]
  }
}
