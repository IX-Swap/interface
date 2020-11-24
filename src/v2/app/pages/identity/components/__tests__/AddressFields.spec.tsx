import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  AddressFields,
  AddressFieldsProps
} from 'v2/app/pages/identity/components/AddressFields'
import { TypedField } from 'v2/components/form/TypedField'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('AddressFields', () => {
  const props: AddressFieldsProps<any> = {
    rootName: 'companyAddress'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <AddressFields {...props} />
      </Form>
    )
  })

  it('defaults rootPath to "address"', () => {
    render(
      <Form>
        <AddressFields {...props} rootName={undefined} />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Line 1',
        name: 'line1',
        rootName: 'address'
      }),
      {}
    )
  })

  it('renders EditableField correctly', () => {
    render(
      <Form>
        <AddressFields {...props} />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(6)
    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Line 1',
        name: 'line1',
        rootName: props.rootName
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Line 2',
        name: 'line2',
        rootName: props.rootName
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'City',
        name: 'city',
        rootName: props.rootName
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Postal Code',
        name: 'postalCode',
        rootName: props.rootName
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'State',
        name: 'state',
        rootName: props.rootName
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        label: 'Country',
        name: 'country',
        rootName: props.rootName
      }),
      {}
    )
  })
})
