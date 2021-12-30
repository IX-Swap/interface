import { PairTableRow } from 'app/pages/exchange/components/PairTable/PairTableRow'
import React from 'react'
import { render } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('PairTableRow', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<PairTableRow item={pair} />)
  })
})
