import React from 'react'
import { render } from 'test-utils'
import { NumberSummaryValue, SummaryValueProps } from '../NumberSummaryValue'

describe('NumberSummaryValue', () => {
  const props: SummaryValueProps = {
    value: 123,
    isNegative: false
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NumberSummaryValue {...props} />)
  })
})
