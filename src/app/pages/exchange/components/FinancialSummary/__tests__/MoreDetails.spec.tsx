import { MoreDetails } from 'app/pages/exchange/components/FinancialSummary/MoreDetails'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('MoreDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MoreDetails />)
  })
})
