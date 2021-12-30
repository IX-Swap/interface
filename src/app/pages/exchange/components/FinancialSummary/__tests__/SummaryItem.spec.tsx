import {
  SummaryItem,
  SummaryItemProps
} from 'app/pages/exchange/components/FinancialSummary/SummaryItem'
import React from 'react'
import { render } from 'test-utils'

describe('SummaryItem', () => {
  const props: SummaryItemProps = {
    value: '123',
    label: 'Item'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<SummaryItem {...props} />)
  })
})
