/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CompanyInformation,
  CompanyInformationProps
} from 'v2/app/pages/identity/components/CompanyInfo'
import * as typedForm from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useTypedForm } from '__fixtures__/createTypedForm'

describe('CompanyInformation', () => {
  const props: CompanyInformationProps = {
    isEditing: false,
    useOwnEmail: false
  }
  const EditableField = jest.fn(() => <div />)

  beforeEach(() => {
    jest.spyOn(typedForm, 'useCorporateIdentityForm').mockReturnValue({
      ...useTypedForm(),
      EditableField
    } as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CompanyInformation {...props} />)
  })

  it('renders EditableField correctly', () => {
    render(<CompanyInformation {...props} />)

    expect(EditableField).toHaveBeenCalledTimes(6)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'Company Name',
        name: 'companyLegalName'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'Company Registration Number',
        name: 'registrationNumber'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      {
        fieldType: 'CountrySelect',
        isEditing: false,
        label: 'Country of Formation',
        name: 'countryOfFormation'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'Date of Incorporation',
        name: 'dateOfIncorporation'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      {
        fieldType: 'TextField',
        isEditing: false,
        label: 'Digital Security Wallet Address',
        name: 'walletAddress'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      6,
      {
        fieldType: 'Checkbox',
        isEditing: false,
        label: 'I would like InvestaX to arrange digital security custody',
        name: 'toArrangeCustody'
      },
      {}
    )
  })
})
