import {
  columns,
  compactColumns
} from 'app/pages/invest/components/Trading/Orders/OpenOrders/columns'

describe('columns', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('columns have the correct labels', () => {
    expect(columns[0].label).toEqual('Date')
    expect(columns[1].label).toEqual('Pair')
    expect(columns[2].label).toEqual('Side')
    expect(columns[3].label).toEqual('Price')
    expect(columns[4].label).toEqual('Quantity')
    expect(columns[5].label).toEqual('Total')
    expect(columns[6].label).toEqual('Filled')
  })
  it('compact columns have the correct labels', () => {
    expect(compactColumns[0].label).toEqual('Pair')
    expect(compactColumns[1].label).toEqual('Quantity')
    expect(compactColumns[2].label).toEqual('Side')
    expect(compactColumns[3].label).toEqual('Price')

    expect(compactColumns[4].label).toEqual('Total')
    expect(compactColumns[5].label).toEqual('Filled')
    expect(compactColumns[6].label).toEqual('Date')
  })
})
