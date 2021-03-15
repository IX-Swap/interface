import { FundSource } from 'app/pages/_identity/components/FinancialInformationForm/FundSource'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/_identity/components/FinancialInformationForm/FundSource',
  () => ({
    FundSource: jest.fn(() => null)
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
