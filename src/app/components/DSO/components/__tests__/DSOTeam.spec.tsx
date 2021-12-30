import React from 'react'
import { render } from 'test-utils'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { Form } from 'components/form/Form'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { DSOTeamMember } from 'app/components/DSO/components/DSOTeamMember'
import { teamMember } from '__fixtures__/issuance'

jest.mock('app/components/DSO/components/DSOChapterAddButton', () => ({
  DSOChapterAddButton: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOTeamMember', () => ({
  DSOTeamMember: jest.fn(() => null)
}))

describe('DSOTeam', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form defaultValues={{ team: [] }}>
        <DSOTeam />
      </Form>
    )
  })

  it('renders DSOTeamAddButton', () => {
    render(
      <Form defaultValues={{ team: [] }}>
        <DSOTeam />
      </Form>
    )

    expect(DSOChapterAddButton).toHaveBeenCalled()
  })

  it('calls DSOTeamMember for each element in the array', () => {
    render(
      <Form defaultValues={{ team: [teamMember, teamMember, teamMember] }}>
        <DSOTeam />
      </Form>
    )

    expect(DSOTeamMember).toBeCalledTimes(3)
  })

  it('does not call DSOTeamMember if array is empty', () => {
    render(
      <Form defaultValues={{ team: [] }}>
        <DSOTeam />
      </Form>
    )

    expect(DSOTeamMember).toBeCalledTimes(0)
  })
})
