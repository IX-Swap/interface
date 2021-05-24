import { Change } from 'app/pages/exchange/market/components/PairTable/Change'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('Change', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Change value={pair.change} trend={pair.trend} />)
  })
})
