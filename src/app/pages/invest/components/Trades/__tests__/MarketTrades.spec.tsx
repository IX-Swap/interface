import { MarketTrades } from 'app/pages/invest/components/Trades/MarketTrades'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('MarketTrades', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MarketTrades />)
  })
})
