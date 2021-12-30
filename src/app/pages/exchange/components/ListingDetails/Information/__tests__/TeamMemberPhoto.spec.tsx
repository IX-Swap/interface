import { TeamMemberPhoto } from 'app/pages/exchange/components/ListingDetails/Information/TeamMemberPhoto'
import React from 'react'
import { render } from 'test-utils'

describe('TeamMemberPhoto', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TeamMemberPhoto size={128} photoId='123' />)
  })
})
