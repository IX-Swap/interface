import React from 'react'
import { render, cleanup } from 'test-utils'
import { FinancialFields } from 'app/pages/identity/components/FinancialFields'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('Financials', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <FinancialFields />
      </Form>
    )
  })

  it('renders EditableField correctly', () => {
    render(
      <Form>
        <FinancialFields />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Occupation',
        name: 'occupation'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Employer',
        name: 'employer'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Employment Status',
        name: 'employmentStatus'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Industry',
        name: 'industryOfEmployment'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'Annual Income',
        name: 'annualIncome'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        label: 'Household Income',
        name: 'houseHoldIncome'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        label: 'Source of Income',
        name: 'sourceOfWealth'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        label: 'Bank Name',
        name: 'bankName'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      9,
      expect.objectContaining({
        label: 'Name of Bank Account',
        name: 'bankAccountName'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      10,
      expect.objectContaining({
        label: 'Bank Account Number',
        name: 'bankAccountNumber'
      }),
      {}
    )
  })
})
