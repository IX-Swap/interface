import React from 'react'
import { render } from 'test-utils'
import { ListingFormWrapper } from 'app/pages/issuance/components/ListingForm/ListingFormWrapper'

describe('ListingFormWrapper', () => {
  it('should match snapshot', () => {
    const { container } = render(<ListingFormWrapper isNew />)
    expect(container).toMatchSnapshot()
  })
})
