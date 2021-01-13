import React from 'react'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { DSOTeamMemberView } from 'app/components/DSO/components/DSOTeamMemberView'

jest.mock('app/components/DSO/components/DSOTeamMemberView', () => ({
  DSOTeamMemberView: jest.fn(() => null)
}))

describe('DSOTeamView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSOTeamView dso={dso} />)
  })

  it('renders data correctly when there is no team data', () => {
    const { getByText } = render(<DSOTeamView dso={dso} />)

    expect(getByText(/Team Members/i)).toBeTruthy()
    expect(DSOTeamMemberView).toBeCalledTimes(0)
  })

  it('renders data correctly when there is team data', () => {
    const editedDSO = {
      ...dso,
      team: [
        {
          about: 'About team member',
          name: 'Team Member',
          photo: '5fd76c0ea642810e312636cf',
          position: 'CEO',
          _id: '5fe959bcd48e8e43b1fbf4d0'
        }
      ]
    }
    const { getByText } = render(<DSOTeamView dso={editedDSO} />)

    expect(getByText(/Team Members/i)).toBeTruthy()
    expect(DSOTeamMemberView).toBeCalledTimes(1)
    expect(DSOTeamMemberView).toHaveBeenCalledWith(
      {
        dsoId: editedDSO._id,
        member: editedDSO.team[0]
      },
      {}
    )
  })
})
