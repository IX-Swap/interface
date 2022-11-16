import { DSOTeamMemberView } from 'app/components/DSO/components/DSOTeamMemberView'
import React from 'react'

import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { teamMember } from '__fixtures__/issuance'

describe('DSOTeamMemberView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSOTeamMemberView dsoId={dso._id} member={teamMember} />)
  })

  it('shows about when component is pressed', async () => {
    const { container, queryByText } = render(
      <DSOTeamMemberView dsoId={dso._id} member={teamMember} />
    )
    expect(queryByText('about')).toBeFalsy()
    fireEvent.click(container, { cancellable: true, bubbles: true })

    waitFor(() => {
      expect(queryByText('about')).toBeTruthy()
    })
  })

  it('matches snapshot', () => {
    const { container } = render(
      <DSOTeamMemberView dsoId={dso._id} member={teamMember} />
    )
    expect(container).toMatchSnapshot()
  })
})
