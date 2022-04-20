import React from 'react'
import { render } from 'test-utils'
import { CreateListing } from 'app/pages/issuance/pages/CreateListing'

describe('CreateListing', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<CreateListing />)

    expect(container).toMatchSnapshot()
  })
})
