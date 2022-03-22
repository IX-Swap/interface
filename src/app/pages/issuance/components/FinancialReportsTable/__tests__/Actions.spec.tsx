import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions } from 'app/pages/issuance/components/FinancialReportsTable/Actions'
import { sampleFinancialReport } from '__fixtures__/financialReport'

describe('Actions', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Actions item={sampleFinancialReport} />)
  })
})
