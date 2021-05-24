import { PairTableRow } from 'app/pages/exchange/market/components/PairTable/PairTableRow'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('PairTableRow', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PairTableRow item={pair} />)
  })
})
