import { FundSource } from 'app/pages/identity/components/FinancialInformationForm/FundSource'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/identity/components/FinancialInformationForm/FundSourceFields',
  () => ({
    FundSourceFields: jest.fn(() => null)
  })
)

describe('FundSource', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FundSource />)
  })
})
