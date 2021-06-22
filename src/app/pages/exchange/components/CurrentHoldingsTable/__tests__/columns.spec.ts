import { columns } from 'app/pages/exchange/components/CurrentHoldingsTable/columns'
import { cleanup } from 'test-utils'

describe('columns', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has the correct labels', () => {
    expect(columns[0].label).toEqual('Pair')
    expect(columns[1].label).toEqual('Name')
    expect(columns[2].label).toEqual('Invested Amount')
    expect(columns[3].label).toEqual('Unit Price')
    expect(columns[4].label).toEqual('Total Amount')
  })
})
