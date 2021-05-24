import {
  DetailsItem,
  DetailsItemProps
} from 'app/pages/exchange/market/components/FinancialSummary/DetailsItem'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DetailsItem', () => {
  const props: DetailsItemProps = {
    value: '1234',
    label: 'Open'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DetailsItem {...props} />)
  })
})
