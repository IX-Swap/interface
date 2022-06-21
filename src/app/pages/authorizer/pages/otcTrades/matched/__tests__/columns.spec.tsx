import { columns } from 'app/pages/authorizer/pages/otcTrades/matched/columns'

describe('columns', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('columns have the correct labels', () => {
    expect(columns[0].label).toEqual('Date')
    expect(columns[1].label).toEqual('Pair')
    expect(columns[2].label).toEqual('Buyer')
    expect(columns[3].label).toEqual('Filled Buy')
    expect(columns[4].label).toEqual('Seller')
    expect(columns[5].label).toEqual('Filled Sell')
    expect(columns[6].label).toEqual('Price')
    expect(columns[7].label).toEqual('Amount')
    expect(columns[8].label).toEqual('Total')
  })
})
