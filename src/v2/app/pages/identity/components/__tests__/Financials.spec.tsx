/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Financials,
  FinancialsProps
} from 'v2/app/pages/identity/components/Financials'
import * as typedForm from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { generateCreateTypedFormResult } from '__fixtures__/createTypedForm'

describe('Financials', () => {
  const props: FinancialsProps = { isEditing: false }
  const EditableField = jest.fn(() => null) as any

  beforeEach(() => {
    jest.spyOn(typedForm, 'useIndividualIdentityForm').mockReturnValue({
      ...generateCreateTypedFormResult(),
      EditableField
    } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Financials {...props} />)
  })

  it('renders EditableField correctly', () => {
    render(<Financials {...props} />)

    expect(EditableField).toHaveBeenCalledTimes(12)
    expect(EditableField).toHaveBeenNthCalledWith(
      1,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Occupation',
        name: 'occupation'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      2,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Employer',
        name: 'employer'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      3,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Employment Status',
        name: 'employmentStatus'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      4,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Industry',
        name: 'industryOfEmployment'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      5,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Digital Security Wallet Address',
        name: 'walletAddress'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      6,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Annual Income',
        name: 'annualIncome'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      7,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Household Income',
        name: 'houseHoldIncome'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      8,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Source of Income',
        name: 'sourceOfWealth'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      9,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Bank Name',
        name: 'bankName'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      10,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Name of Bank Account',
        name: 'bankAccountName'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      11,
      {
        fieldType: 'TextField',
        isEditing: props.isEditing,
        label: 'Bank Account Number',
        name: 'bankAccountNumber'
      },
      {}
    )
    expect(EditableField).toHaveBeenNthCalledWith(
      12,
      {
        fieldType: 'Checkbox',
        isEditing: props.isEditing,
        label: 'I would like InvestaX to arrange digital security custody',
        name: 'toArrangeCustody'
      },
      {}
    )
  })
})
