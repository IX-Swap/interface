import { TeamMemberPhoto } from 'app/pages/exchange/market/components/ListingDetails/Information/TeamMemberPhoto'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TeamMemberPhoto', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <TeamMemberPhoto
        resourceId='123'
        size={128}
        resourceUri='/asset/uri'
        photoId='123'
      />
    )
  })
})
