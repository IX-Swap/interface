import { FinancialSummary } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FinancialSummary', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FinancialSummary />)
  })
})
