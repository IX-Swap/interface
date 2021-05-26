import { TeamMembers } from 'app/pages/exchange/market/components/ListingDetails/Information/TeamMembers'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TeamMembers', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TeamMembers listing={{}} />)
  })
})
