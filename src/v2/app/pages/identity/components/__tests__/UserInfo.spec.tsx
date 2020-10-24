/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import PersonalInformation, {
  IdentityForm
} from 'v2/app/pages/identity/components/PersonalInfoFields'
import * as typedForm from 'v2/components/form/useTypedForm'
import { generateCreateTypedFormResult } from '__fixtures__/createTypedForm'

describe('PersonalInformation', () => {
  const props: IdentityForm = {
    useOwnEmail: false,
    isEditing: false,
    rootPath: 'test-root-path'
  }
  const EditableField = jest.fn(() => null) as any

  beforeEach(() => {
    jest.spyOn(typedForm, 'useTypedForm').mockReturnValue({
      ...generateCreateTypedFormResult(),
      EditableField
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<PersonalInformation {...props} />)
  })

  it('renders EditableField correctly', () => {
    render(<PersonalInformation {...props} />)

    expect(EditableField).toHaveBeenCalledTimes(11)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        fieldType: 'DataroomDocument',
        isEditing: props.isEditing,
        name: 'photo'
      }),
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'firstName',
        label: 'First Name'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'middleName',
        label: 'Middle Name'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'lastName',
        label: 'Last Name'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      {
        fieldType: 'DatePicker',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'dob',
        label: 'Date of Birth'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      6,
      {
        fieldType: 'NationalitySelect',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'nationality',
        label: 'Nationality'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      7,
      {
        fieldType: 'CountrySelect',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'countryOfResidence',
        label: 'Country of Residence'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      8,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'email',
        label: 'Email'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      9,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'contactNumber',
        label: 'Contact Number'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      10,
      {
        fieldType: 'GenderSelect',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'gender',
        label: 'Gender'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      11,
      {
        fieldType: 'MartialStatusSelect',
        isEditing: props.isEditing,
        root: props.rootPath,
        name: 'maritalStatus',
        label: 'Marital Status'
      },
      {}
    )
  })
})
