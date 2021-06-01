import { TeamMemberView } from 'app/pages/exchange/market/components/ListingDetails/Information/TeamMemberView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { teamMember } from '__fixtures__/issuance'

describe('TeamMemberView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <TeamMemberView resourceUri='/uri' resourceId='123' member={teamMember} />
    )
  })
})
