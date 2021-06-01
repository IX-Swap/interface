import { Profile } from 'app/pages/exchange/market/components/ListingDetails/Information/Profile'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Profile', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Profile />)
  })
})
