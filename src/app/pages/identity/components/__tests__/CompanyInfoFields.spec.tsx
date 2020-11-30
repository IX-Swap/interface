import React from 'react'
import { render, cleanup } from 'test-utils'
import { CompanyInfoFields } from 'app/pages/identity/components/CompanyInfoFields'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('CompanyInformation', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <CompanyInfoFields />
      </Form>
    )
  })

  it('renders EditableField correctly', () => {
    render(
      <Form>
        <CompanyInfoFields />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Company Logo',
        name: 'logo'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Company Name',
        name: 'companyLegalName'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Company Registration Number',
        name: 'registrationNumber'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Country of Formation',
        name: 'countryOfFormation'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'Date of Incorporation',
        name: 'dateOfIncorporation'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        label: 'Email Address',
        name: 'email'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        label: 'Contact Number',
        name: 'contactNumber'
      }),
      {}
    )
  })
})
