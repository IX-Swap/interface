import { PairName } from 'app/pages/exchange/components/PairTable/PairName'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('PairName', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairName pair={pair} />)
  })
})
