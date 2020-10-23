/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOTeam, DSOTeamProps } from 'v2/app/components/DSO/components/DSOTeam'
import { Form } from 'v2/components/form/Form'
import { DSOTeamMember } from 'v2/app/components/DSO/components/DSOTeamMember'
import { DSOTeamAddButton } from 'v2/app/components/DSO/components/DSOTeamAddButton'

jest.mock('v2/app/components/UserAvatar', () => ({
  UserAvatar: jest.fn(() => null)
}))
jest.mock('v2/app/components/DSO/components/DSOTeamMember', () => ({
  DSOTeamMember: jest.fn(() => null)
}))
jest.mock('v2/app/components/DSO/components/DSOTeamAddButton', () => ({
  DSOTeamAddButton: jest.fn(() => null)
}))

describe('DSOTeam', () => {
  const team = [{ name: 'Name', photo: '1', position: 'Position', about: '' }]
  const props: DSOTeamProps = { isEditing: false, dsoOwnerId: '' }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={{ team }}>
        <DSOTeam {...props} />
      </Form>
    )
  })

  it('renders DSOTeamRemoveButton & DSOTeamAddButton if isEditing is true', () => {
    render(
      <Form defaultValues={{ team }}>
        <DSOTeam {...props} isEditing />
      </Form>
    )

    expect(DSOTeamAddButton).toHaveBeenCalledTimes(1)
    expect(DSOTeamAddButton).toHaveBeenCalledWith(
      {
        append: expect.any(Function)
      },
      {}
    )
  })

  it('renders DSOTeamMember with correct props for every team member', () => {
    render(
      <Form defaultValues={{ team }}>
        <DSOTeam {...props} isEditing />
      </Form>
    )

    expect(DSOTeamMember).toHaveBeenCalledTimes(1)
    expect(DSOTeamMember).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        defaultValue: expect.objectContaining({ ...team[0] }),
        dsoOwnerId: props.dsoOwnerId
      }),
      {}
    )
  })
})
