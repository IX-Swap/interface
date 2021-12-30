import { TradesTableCell } from 'app/pages/exchange/components/Trades/TradesTablecell'
import React from 'react'
import { render } from 'test-utils'

describe('TradesTableCell', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TradesTableCell />)
  })
})
