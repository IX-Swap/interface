import { Information } from 'app/pages/exchange/components/ListingDetails/Information/Information'
import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('Information', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Information data={listing} />)
  })
})
