import {
  PricingOverview,
  PricingOverviewProps
} from 'app/pages/exchange/components/ListingDetails/Overview/PricingOverview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('PricingOverview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const props: PricingOverviewProps = {
      minTradeAmount: listing.minimumTradeUnits,
      maxTradeAmount: listing.maximumTradeUnits,
      raisedAmount: listing.raisedAmount
    }
    render(<PricingOverview {...props} />)
  })
})
