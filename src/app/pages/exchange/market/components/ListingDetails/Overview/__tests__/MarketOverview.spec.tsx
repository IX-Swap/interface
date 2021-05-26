import { MarketOverview } from 'app/pages/exchange/market/components/ListingDetails/Overview/MarketOverview'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('MarketOverview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MarketOverview />)
  })
})
