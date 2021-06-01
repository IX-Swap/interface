import { TeamMemberView } from 'app/pages/exchange/components/ListingDetails/Information/TeamMemberView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { teamMember } from '__fixtures__/issuance'

describe('TeamMemberView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TeamMemberView member={teamMember} />)
  })
})
