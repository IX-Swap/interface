import { TradesTable } from 'app/pages/exchange/components/Trades/TradesTable'
import React from 'react'
import { render } from 'test-utils'

describe('TradesTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TradesTable data={[]} />)
  })
})
