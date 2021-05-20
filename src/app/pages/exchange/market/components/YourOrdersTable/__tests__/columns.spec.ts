import { columns } from 'app/pages/exchange/market/components/YourOrdersTable/columns'
import { cleanup } from 'test-utils'

describe('columns', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has the correct labels', () => {
    expect(columns[0].label).toEqual('Date')
    expect(columns[1].label).toEqual('Pair')
    expect(columns[2].label).toEqual('Name')
    expect(columns[3].label).toEqual('Side')
    expect(columns[4].label).toEqual('Type')
    expect(columns[5].label).toEqual('Time-In Force')
    expect(columns[6].label).toEqual('Unit Price')
    expect(columns[7].label).toEqual('Units')
    expect(columns[8].label).toEqual('Total Amount')
  })
})
