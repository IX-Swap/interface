import { TeamMemberPhoto } from 'app/pages/exchange/components/ListingDetails/Information/TeamMemberPhoto'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TeamMemberPhoto', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TeamMemberPhoto size={128} photoId='123' />)
  })
})
