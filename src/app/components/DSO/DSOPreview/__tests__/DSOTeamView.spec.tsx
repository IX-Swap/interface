import React from 'react'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { DSOTeamMemberView } from 'app/components/DSO/components/DSOTeamMemberView'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

jest.mock('app/components/DSO/components/DSOTeamMemberView', () => ({
  DSOTeamMemberView: jest.fn(() => null)
}))

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

jest.mock('app/components/DSO/components/FormSectionHeader', () => ({
  FormSectionHeader: jest.fn(() => null)
}))

describe('DSOTeamView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders title', () => {
    render(<DSOTeamView dso={dso} />)

    expect(FormSectionHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Team Members'
      }),
      {}
    )
  })

  // it('renders title when isNewThemeOn is true', () => {
  //   render(<DSOTeamView dso={dso} isNewThemeOn />)

  //   expect(FormSectionHeader).toHaveBeenCalledTimes(0)
  //   expect(Typography).toHaveBeenCalledTimes(1)
  //   expect(Typography).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       variant: 'h4',
  //       color: 'primary',
  //       style: { fontWeight: 700 },
  //       children: 'Team Members'
  //     }),
  //     {}
  //   )
  // })

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
    render(<DSOTeamView dso={editedDSO} />)

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
