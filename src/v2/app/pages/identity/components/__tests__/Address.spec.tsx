/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Address,
  AddressFieldsProps
} from 'v2/app/pages/identity/components/Address'
import * as typedForm from 'v2/components/form/useTypedForm'
import { generateCreateTypedFormResult } from '__fixtures__/createTypedForm'

describe('Address', () => {
  const props: AddressFieldsProps<any> = {
    isEditing: false,
    rootPath: 'companyAddress'
  }
  const EditableField = jest.fn(() => null) as any

  beforeEach(() => {
    jest
      .spyOn(typedForm, 'useTypedForm')
      .mockReturnValue({ ...generateCreateTypedFormResult(), EditableField })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Address {...props} />)
  })

  it('defaults rootPath to "address"', () => {
    render(<Address {...props} rootPath={undefined} />)

    expect(EditableField).toHaveBeenCalledTimes(6)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'Line 1',
        name: 'line1',
        root: 'address'
      },
      {}
    )
  })

  it('renders EditableField correctly', () => {
    render(<Address {...props} />)

    expect(EditableField).toHaveBeenCalledTimes(6)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'Line 1',
        name: 'line1',
        root: props.rootPath
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'Line 2',
        name: 'line2',
        root: props.rootPath
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'City',
        name: 'city',
        root: props.rootPath
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'Postal Code',
        name: 'postalCode',
        root: props.rootPath
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'State',
        name: 'state',
        root: props.rootPath
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      6,
      {
        fieldType: 'CountrySelect',
        isEditing: false,
        label: 'Country',
        name: 'country',
        root: props.rootPath
      },
      {}
    )
  })
})
