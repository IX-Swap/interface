import {
  SummaryItem,
  SummaryItemProps
} from 'app/pages/exchange/components/FinancialSummary/SummaryItem'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SummaryItem', () => {
  const props: SummaryItemProps = {
    value: '123',
    label: 'Item'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SummaryItem {...props} />)
  })
})
