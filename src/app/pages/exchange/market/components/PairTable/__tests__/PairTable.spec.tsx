import { PairTable } from 'app/pages/exchange/market/components/PairTable/PairTable'
import { Pair } from 'app/pages/exchange/market/hooks/useMarketList'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('PairTable', () => {
  const data: Pair[] = [pair]
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairTable data={data} />)
  })
})
