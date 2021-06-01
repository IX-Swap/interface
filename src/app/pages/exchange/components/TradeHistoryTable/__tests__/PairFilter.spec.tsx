import { PairFilter } from 'app/pages/exchange/components/TradeHistoryTable/PairFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PairFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairFilter />)
  })
})
