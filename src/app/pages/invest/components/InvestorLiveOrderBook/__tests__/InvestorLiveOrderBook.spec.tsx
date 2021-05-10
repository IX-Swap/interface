import { InvestorLiveOrderBook } from 'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('InvestorLiveOrderBook', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<InvestorLiveOrderBook />)
  })
})
