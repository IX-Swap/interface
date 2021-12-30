import React from 'react'
import { render } from 'test-utils'
import {
  IndividualInfoFields,
  IndividualInfoFieldsProps
} from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('IndividualInfoFields', () => {
  const props: IndividualInfoFieldsProps = {
    rootName: 'test-root-path'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders EditableField correctly', () => {
    render(
      <Form>
        <IndividualInfoFields {...props} />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'photo'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'firstName',
        label: 'First Name'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'middleName',
        label: 'Middle Name'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'lastName',
        label: 'Last Name'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'dob',
        label: 'Date of Birth'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'contactNumber',
        label: 'Contact Number'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'email',
        label: 'Email'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'nationality',
        label: 'Citizenship'
      }),
      {}
    )
  })
})
