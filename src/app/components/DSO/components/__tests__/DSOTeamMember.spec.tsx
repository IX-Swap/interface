import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import {
  DSOTeamMember,
  DSOTeamMemberProps
} from 'app/components/DSO/components/DSOTeamMember'
import { teamMember } from '__fixtures__/issuance'
import { wysiwygValueExtractor } from 'helpers/forms'

jest.mock('app/components/DSO/components/DSOTeamRemoveButton', () => ({
  DSOTeamRemoveButton: jest.fn(() => <button />)
}))

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOTeamMember', () => {
  const props: DSOTeamMemberProps = {
    defaultValue: teamMember,
    fieldId: '1',
    index: 0,
    remove: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: '',
        name: ['team', props.index, 'photo']
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Name',
        name: ['team', props.index, 'name']
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Position',
        name: ['team', props.index, 'position']
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'About',
        name: ['team', props.index, 'about'],
        valueExtractor: wysiwygValueExtractor
      }),
      {}
    )
  })
})
