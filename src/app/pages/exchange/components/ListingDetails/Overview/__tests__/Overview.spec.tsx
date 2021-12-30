import { Overview } from 'app/pages/exchange/components/ListingDetails/Overview/Overview'
import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('Overview', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Overview data={listing} />)
  })
})
