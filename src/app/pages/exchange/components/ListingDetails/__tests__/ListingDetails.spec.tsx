import { ListingDetails } from 'app/pages/exchange/components/ListingDetails/ListingDetails'
import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('ListingDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ListingDetails data={listing} />)
  })

  it('renders null when listing is undefined', () => {
    const { container } = render(<ListingDetails data={undefined} />)
    expect(container).toBeEmptyDOMElement()
  })
})
