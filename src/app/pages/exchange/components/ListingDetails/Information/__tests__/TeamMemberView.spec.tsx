import { TeamMemberView } from 'app/pages/exchange/components/ListingDetails/Information/TeamMemberView'
import React from 'react'
import { render } from 'test-utils'
import { teamMember } from '__fixtures__/issuance'

describe('TeamMemberView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TeamMemberView member={teamMember} />)
  })
})
