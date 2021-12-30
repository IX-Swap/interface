import { FundSource } from 'app/pages/identity/components/FinancialInformationForm/FundSource'
import React from 'react'
import { render } from 'test-utils'

jest.mock(
  'app/pages/identity/components/FinancialInformationForm/FundSource',
  () => ({
    FundSource: jest.fn(() => null)
  })
)

describe('FundSource', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<FundSource />)
  })
})
