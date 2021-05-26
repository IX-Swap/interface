import { ListingHeader } from 'app/pages/exchange/market/components/ListingDetails/ListingHeader'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ListingHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ListingHeader />)
  })
})
