import { LastPrice } from 'app/pages/exchange/market/components/PairTable/LastPrice'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('LastPrice', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<LastPrice value={pair.lastPrice} trend={pair.trend} />)
  })
})
