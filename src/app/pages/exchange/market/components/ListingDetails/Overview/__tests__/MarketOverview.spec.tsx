import {
  MarketOverview,
  MarketOverviewProps
} from 'app/pages/exchange/market/components/ListingDetails/Overview/MarketOverview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('MarketOverview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const props: MarketOverviewProps = {
      availableMarket: listing.marketType,
      markets: listing.exchange.markets
    }
    render(<MarketOverview {...props} />)
  })
})
