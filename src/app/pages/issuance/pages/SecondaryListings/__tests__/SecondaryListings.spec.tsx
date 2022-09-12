import React from 'react'
import { render } from 'test-utils'
import { SecondaryListings } from 'app/pages/issuance/pages/SecondaryListings/SecondaryListings'

describe('SecondaryListings', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const container = render(<SecondaryListings />)
    expect(container).toMatchSnapshot()
  })
})
