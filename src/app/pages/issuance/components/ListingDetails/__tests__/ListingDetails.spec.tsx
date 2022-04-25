import { ListingDetails } from 'app/pages/issuance/components/ListingDetails/ListingDetails'
import React from 'react'
import { render } from 'test-utils'

describe('ListingDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders null when listing is undefined', () => {
    const { container } = render(<ListingDetails data={undefined} />)
    expect(container).toBeEmptyDOMElement()
  })
})
