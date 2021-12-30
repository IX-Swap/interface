import { LastPrice } from 'app/pages/exchange/components/PairTable/LastPrice'
import React from 'react'
import { render } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('LastPrice', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<LastPrice value={pair.lastPrice} trend={pair.trend} />)
  })
})
