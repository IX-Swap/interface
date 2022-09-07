import React from 'react'
import { render } from 'test-utils'
import { ListingForm } from 'app/pages/issuance/components/ListingForm/ListingForm'

describe('ListingForm', () => {
  it('should match snapshot', () => {
    const { container } = render(<ListingForm isNew />)
    expect(container).toMatchSnapshot()
  })
})
