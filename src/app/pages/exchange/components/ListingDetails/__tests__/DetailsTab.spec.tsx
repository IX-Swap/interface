import { DetailsTab } from 'app/pages/exchange/components/ListingDetails/DetailsTab'
import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('DetailsTab', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DetailsTab data={listing} />)
  })
})
