import { PairName } from 'app/pages/exchange/components/PairTable/PairName'
import React from 'react'
import { render } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('PairName', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<PairName pair={pair} />)
  })
})
