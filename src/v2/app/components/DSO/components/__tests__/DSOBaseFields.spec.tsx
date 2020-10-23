/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOBaseFields,
  DSOBaseFieldsProps
} from 'v2/app/components/DSO/components/DSOBaseFields'
import { Form } from 'v2/components/form/Form'
import { UserAvatar } from 'v2/app/components/UserAvatar'
import { useTypedForm } from '__fixtures__/createTypedForm'
import * as dsoForm from 'v2/app/components/DSO/DSOForm'

jest.mock('v2/app/components/UserAvatar', () => ({
  UserAvatar: jest.fn(() => null)
}))

describe('DSOBaseFields', () => {
  const props: DSOBaseFieldsProps = { dsoOwnerId: '', isEditing: false }
  const EditableField = jest.fn(() => <div />)

  beforeEach(() => {
    jest
      .spyOn(dsoForm, 'useDSOForm')
      .mockReturnValue({ ...useTypedForm(), EditableField })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOBaseFields {...props} />
      </Form>
    )
  })

  it('renders UserAvatar with correct props', () => {
    render(
      <Form>
        <DSOBaseFields {...props} />
      </Form>
    )

    expect(UserAvatar).toHaveBeenCalledTimes(1)
    expect(UserAvatar).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'logo',
        isEditing: props.isEditing,
        ownerId: props.dsoOwnerId
      }),
      {}
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOBaseFields {...props} />
      </Form>
    )

    expect(EditableField).toHaveBeenCalledTimes(6)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Token Name',
        name: 'tokenName'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Symbol',
        name: 'tokenSymbol'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        fieldType: 'DatePicker',
        isEditing: props.isEditing,
        label: 'Launch Date',
        name: 'launchDate'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        fieldType: 'CorporateSelect',
        isEditing: props.isEditing,
        label: 'Corporate',
        name: 'corporate'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Issuer Name',
        name: 'issuerName'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        fieldType: 'AssetSelect',
        isEditing: props.isEditing,
        label: 'Currency',
        assetType: 'Currency',
        name: 'currency'
      }),
      {}
    )
  })
})
