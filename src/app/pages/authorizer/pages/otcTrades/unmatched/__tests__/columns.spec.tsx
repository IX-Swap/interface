import { getColumns } from 'app/pages/authorizer/pages/otcTrades/unmatched/columns'

describe('columns', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('columns have the correct labels', () => {
    const columns = getColumns('BUY')
    const columns2 = getColumns('SELL')
    expect(columns[0].label).toEqual('Pair')
    expect(columns[1].label).toEqual('Buyer')
    expect(columns[2].label).toEqual('Phone')
    expect(columns[3].label).toEqual('Price')
    expect(columns[4].label).toEqual('Amount')
    expect(columns[5].label).toEqual('Total')

    expect(columns2[1].label).toEqual('Seller')
  })
})
