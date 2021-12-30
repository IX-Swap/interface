import { Profile } from 'app/pages/exchange/components/ListingDetails/Information/Profile'
import React from 'react'
import { render } from 'test-utils'

describe('Profile', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Profile />)
  })
})
