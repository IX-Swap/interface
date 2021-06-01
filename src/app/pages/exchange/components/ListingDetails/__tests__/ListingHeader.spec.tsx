import {
  ListingHeader,
  ListingHeaderProps
} from 'app/pages/exchange/market/components/ListingDetails/ListingHeader'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('ListingHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const props: ListingHeaderProps = {
      logoId: listing.logo,
      name: listing.tokenName,
      symbol: listing.tokenSymbol,
      companyName: listing.companyName ?? '',
      markets: listing.markets
    }
    render(<ListingHeader {...props} />)
  })
})
