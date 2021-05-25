import React from 'react'
import { render, cleanup } from 'test-utils'
import { MarketRoot } from 'app/pages/exchange/market/MarketRoot'

jest.mock(
  'app/pages/invest/components/TVChartContainer/TVChartContainer',
  () => ({
    TVChartContainer: jest.fn(() => null)
  })
)
describe('MarketRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<MarketRoot />)
  })
})
