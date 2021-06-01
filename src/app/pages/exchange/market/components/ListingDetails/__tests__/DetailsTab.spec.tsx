import { DetailsTab } from 'app/pages/exchange/market/components/ListingDetails/DetailsTab'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('DetailsTab', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DetailsTab data={listing} />)
  })
})
