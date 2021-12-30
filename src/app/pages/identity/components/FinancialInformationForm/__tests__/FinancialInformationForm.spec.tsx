import { FinancialInformationForm } from 'app/pages/identity/components/FinancialInformationForm/FinancialInformationForm'
import React from 'react'
import { render } from 'test-utils'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { FundSource } from 'app/pages/identity/components/FinancialInformationForm/FundSource'

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
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<FinancialInformationForm />)
  })

  it('renders components without errors', () => {
    render(<FinancialInformationForm />)

    expect(EmploymentField).toHaveBeenCalled()
    expect(FundSource).toHaveBeenCalled()
  })
})
