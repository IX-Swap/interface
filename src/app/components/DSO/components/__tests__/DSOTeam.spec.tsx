import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { Form } from 'components/form/Form'
import { DSOTeamAddButton } from 'app/components/DSO/components/DSOTeamAddButton'
import { DSOTeamMember } from 'app/components/DSO/components/DSOTeamMember'
import { teamMember } from '__fixtures__/issuance'

jest.mock('app/__tests__/DSO/__tests__/DSOTeamAddButton', () => ({
  DSOTeamAddButton: jest.fn(() => null)
}))

jest.mock('app/__tests__/DSO/__tests__/DSOTeamMember', () => ({
  DSOTeamMember: jest.fn(() => null)
}))

describe('DSOTeam', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
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

    expect(DSOTeamAddButton).toHaveBeenCalled()
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
