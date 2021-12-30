import {
  DetailsItem,
  DetailsItemProps
} from 'app/pages/exchange/components/FinancialSummary/DetailsItem'
import React from 'react'
import { render } from 'test-utils'

describe('DetailsItem', () => {
  const props: DetailsItemProps = {
    value: '1234',
    label: 'Open'
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DetailsItem {...props} />)
  })
})
