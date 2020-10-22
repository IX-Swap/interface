/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'v2/components/form/Form'
import { DSOTeamRemoveButton } from 'v2/app/components/DSO/components/DSOTeamRemoveButton'
import { EditableField } from 'v2/components/form/EditableField'
import {
  DSOTeamMember,
  DSOTeamMemberProps
} from 'v2/app/components/DSO/components/DSOTeamMember'
import { teamMember } from '__fixtures__/issuance'
import { plainValueExtractor } from 'v2/components/form/createTypedForm'

jest.mock('v2/app/components/DSO/components/DSOTeamRemoveButton', () => ({
  DSOTeamRemoveButton: jest.fn(() => <button />)
}))

jest.mock('v2/components/form/EditableField', () => ({
  EditableField: jest.fn(() => <input />)
}))

describe('DSOTeamMember', () => {
  const props: DSOTeamMemberProps = {
    defaultValue: teamMember,
    fieldId: '1',
    index: 0,
    remove: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={{ team: [teamMember] }}>
        <DSOTeamMember {...props} />
      </Form>
    )
  })

  it('renders DSOTeamRemoveButton', () => {
    render(
      <Form defaultValues={{ team: [teamMember] }}>
        <DSOTeamMember {...props} />
      </Form>
    )

    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      {
        remove: props.remove,
        index: props.index
      },
      {}
    )
  })

  it('renders photo, name, position and about fields', () => {
    render(
      <Form defaultValues={{ team: [teamMember] }}>
        <DSOTeamMember {...props} />
      </Form>
    )

    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Photo',
        name: `team[${props.index}].photo`
      }),
      {}
    )

    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Name',
        name: `team[${props.index}].name`
      }),
      {}
    )

    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Position',
        name: `team[${props.index}].position`
      }),
      {}
    )

    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'About',
        name: `team[${props.index}].about`,
        valueExtractor: plainValueExtractor
      }),
      {}
    )
  })
})
