import { PairTable } from 'app/pages/exchange/components/PairTable/PairTable'
import { Pair } from 'app/pages/exchange/hooks/useMarketList'
import React from 'react'
import { render } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('PairTable', () => {
  const data: Pair[] = [pair]
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<PairTable data={data} loadMore={() => {}} />)
  })
})
