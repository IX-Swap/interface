import { TeamMembers } from 'app/pages/exchange/components/ListingDetails/Information/TeamMembers'
import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('TeamMembers', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TeamMembers teamMembers={listing.team} listingId={listing._id} />)
  })
})
