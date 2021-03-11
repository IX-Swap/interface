import { FinancialInformationForm } from 'app/pages/_identity/components/FinancialInformationForm/FinancialInformationForm'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { EmploymentField } from 'app/pages/_identity/components/FinancialInformationForm/EmploymentFields'
import { FundSource } from 'app/pages/_identity/components/FinancialInformationForm/FundSource'

jest.mock(
  'app/pages/identity/components/FinancialInformationForm/EmploymentFields',
  () => ({
    EmploymentField: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/FinancialInformationForm/FundSource',
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

  it('renders components without errors', () => {
    render(<FinancialInformationForm />)

    expect(EmploymentField).toHaveBeenCalled()
    expect(FundSource).toHaveBeenCalled()
  })
})
