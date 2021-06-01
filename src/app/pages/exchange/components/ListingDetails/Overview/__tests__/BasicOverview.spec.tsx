import { BasicOverview } from 'app/pages/exchange/market/components/ListingDetails/Overview/BasicOverview'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('BasicOverview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<BasicOverview />)
  })
})
