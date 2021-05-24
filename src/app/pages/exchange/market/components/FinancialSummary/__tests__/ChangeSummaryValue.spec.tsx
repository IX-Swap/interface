import { ChangeSummaryValue } from 'app/pages/exchange/market/components/FinancialSummary/ChangeSummaryValue'
import { SummaryValueProps } from 'app/pages/exchange/market/components/FinancialSummary/NumberSummaryValue'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ChangeSummaryValue', () => {
  const props: SummaryValueProps = {
    value: 123,
    isNegative: false
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ChangeSummaryValue {...props} />)
  })
})
