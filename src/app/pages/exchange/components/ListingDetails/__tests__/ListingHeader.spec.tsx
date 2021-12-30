import {
  ListingHeader,
  ListingHeaderProps
} from 'app/pages/exchange/components/ListingDetails/ListingHeader'
import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('ListingHeader', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
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
