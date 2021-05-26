import { Overview } from 'app/pages/exchange/market/components/ListingDetails/Overview/Overview'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Overview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Overview />)
  })
})
