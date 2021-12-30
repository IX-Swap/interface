import {
  MarketOverview,
  MarketOverviewProps
} from 'app/pages/exchange/components/ListingDetails/Overview/MarketOverview'
import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('MarketOverview', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    const props: MarketOverviewProps = {
      availableMarket: listing.marketType,
      markets: listing.exchange.markets
    }
    render(<MarketOverview {...props} />)
  })
})
