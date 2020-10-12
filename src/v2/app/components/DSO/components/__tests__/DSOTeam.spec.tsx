/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOTeam, DSOTeamProps } from 'v2/app/components/DSO/components/DSOTeam'
import { Form } from 'v2/components/form/Form'
import { useTypedForm } from '__fixtures__/createTypedForm'
import * as dsoForm from 'v2/app/components/DSO/DSOForm'
import { UserAvatar } from 'v2/app/components/UserAvatar'
import { DSOTeamRemoveButton } from 'v2/app/components/DSO/components/DSOTeamRemoveButton'
import { DSOTeamAddButton } from 'v2/app/components/DSO/components/DSOTeamAddButton'

jest.mock('v2/app/components/UserAvatar', () => ({
  UserAvatar: jest.fn(() => null)
}))
jest.mock('v2/app/components/DSO/components/DSOTeamRemoveButton', () => ({
  DSOTeamRemoveButton: jest.fn(() => null)
}))
jest.mock('v2/app/components/DSO/components/DSOTeamAddButton', () => ({
  DSOTeamAddButton: jest.fn(() => null)
}))

describe('DSOTeam', () => {
  const props: DSOTeamProps = { isEditing: false, dsoOwnerId: '' }
  const EditableField = jest.fn(() => <div />)
  const FieldsArray = jest.fn(({ children }) =>
    children({ fields: [{}], append: jest.fn(), remove: jest.fn() })
  )
  const FormValue = jest.fn(() => <div />)

  beforeEach(() => {
    jest.spyOn(dsoForm, 'useDSOForm').mockReturnValue({
      ...useTypedForm(),
      EditableField,
      FieldsArray,
      FormValue
    })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOTeam {...props} />
      </Form>
    )
  })

  it('renders DSOTeamRemoveButton & DSOTeamAddButton if isEditing is true', () => {
    render(
      <Form>
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
    expect(DSOTeamRemoveButton).toHaveBeenCalledTimes(1)
    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      {
        remove: expect.any(Function),
        index: 0
      },
      {}
    )
  })

  it('renders UserAvatar with correct props', () => {
    render(
      <Form>
        <DSOTeam {...props} />
      </Form>
    )

    expect(UserAvatar).toHaveBeenCalledTimes(1)
    expect(UserAvatar).toHaveBeenCalledWith(
      {
        name: 'team[0].photo',
        size: 270,
        variant: 'rounded',
        isEditing: props.isEditing,
        ownerId: props.dsoOwnerId
      },
      {}
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOTeam {...props} />
      </Form>
    )

    expect(EditableField).toHaveBeenCalledTimes(3)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Name',
        name: ['team', 0, 'name'],
        formControlProps: expect.anything()
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Position',
        name: ['team', 0, 'position'],
        formControlProps: expect.anything()
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      {
        fieldType: 'RichTextEditor',
        isEditing: props.isEditing,
        name: ['team', 0, 'about'],
        label: 'About',
        viewRenderer: expect.anything()
      },
      {}
    )
  })
})
