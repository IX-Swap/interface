import { FinancialInformationForm } from 'app/pages/identity/components/FinancialInformationForm/FinancialInformationForm'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { FundSource } from 'app/pages/identity/components/FinancialInformationForm/FundSource'

jest.mock(
  'app/pages/identity/__tests__/FinancialInformationForm/EmploymentFields',
  () => ({
    EmploymentField: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/__tests__/FinancialInformationForm/FundSource',
  () => ({
    FundSource: jest.fn(() => null)
  })
)

describe('FinancialInformationForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FinancialInformationForm />)
  })

  it('renders __tests__ without errors', () => {
    render(<FinancialInformationForm />)

    expect(EmploymentField).toHaveBeenCalled()
    expect(FundSource).toHaveBeenCalled()
  })
})
