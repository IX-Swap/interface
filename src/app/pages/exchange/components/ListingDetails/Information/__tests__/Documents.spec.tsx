import { Documents } from 'app/pages/exchange/components/ListingDetails/Information/Documents'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Documents', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Documents data={[]} title='Documents' />)
  })
})
