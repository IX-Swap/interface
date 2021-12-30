import { Change } from 'app/pages/exchange/components/PairTable/Change'
import React from 'react'
import { render } from 'test-utils'
import { pair } from '__fixtures__/tradingPair'

describe('Change', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Change value={pair.change} trend={pair.trend} />)
  })
})
