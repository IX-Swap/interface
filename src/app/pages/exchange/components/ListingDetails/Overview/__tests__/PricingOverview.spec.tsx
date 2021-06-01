import { PricingOverview } from 'app/pages/exchange/market/components/ListingDetails/Overview/PricingOverview'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PricingOverview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PricingOverview />)
  })
})
