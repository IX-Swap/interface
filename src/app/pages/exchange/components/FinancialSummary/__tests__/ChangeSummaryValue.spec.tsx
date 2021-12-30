import { ChangeSummaryValue } from 'app/pages/exchange/components/FinancialSummary/ChangeSummaryValue'
import { SummaryValueProps } from 'app/pages/exchange/components/FinancialSummary/NumberSummaryValue'
import React from 'react'
import { render } from 'test-utils'

describe('ChangeSummaryValue', () => {
  const props: SummaryValueProps = {
    value: 123,
    isNegative: false
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ChangeSummaryValue {...props} />)
  })
})
