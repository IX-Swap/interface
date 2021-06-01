import { OfferingTerms } from 'app/pages/exchange/market/components/ListingDetails/Overview/OfferingTerms'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OfferingTerms', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OfferingTerms />)
  })
})
