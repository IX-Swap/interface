import { Documents } from 'app/pages/exchange/components/ListingDetails/Information/Documents'
import React from 'react'
import { render } from 'test-utils'

describe('Documents', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Documents data={[]} title='Documents' />)
  })
})
