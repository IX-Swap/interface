/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualInfoFields,
  IndividualInfoFieldsProps
} from 'v2/app/pages/identity/components/IndividualInfoFields'
import { TypedField } from 'v2/components/form/TypedField'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('IndividualInfoFields', () => {
  const props: IndividualInfoFieldsProps = {
    rootName: 'test-root-path'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <IndividualInfoFields {...props} />
      </Form>
    )
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
        name: 'nationality',
        label: 'Nationality'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'countryOfResidence',
        label: 'Country of Residence'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'email',
        label: 'Email'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      9,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'contactNumber',
        label: 'Contact Number'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      10,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'gender',
        label: 'Gender'
      }),

      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      11,
      expect.objectContaining({
        rootName: props.rootName,
        name: 'maritalStatus',
        label: 'Marital Status'
      }),
      {}
    )
  })
})
