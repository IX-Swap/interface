import { Information } from 'app/pages/exchange/market/components/ListingDetails/Information/Information'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('Information', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Information data={listing} />)
  })
})
