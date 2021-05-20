import React from 'react'
import { render, cleanup } from 'test-utils'
import { NumberSummaryValue, SummaryValueProps } from '../NumberSummaryValue'

describe('NumberSummaryValue', () => {
  const props: SummaryValueProps = {
    value: 123,
    isNegative: false
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NumberSummaryValue {...props} />)
  })
})
