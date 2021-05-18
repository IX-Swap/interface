import { TradesTableCell } from 'app/pages/invest/components/Trades/TradesTablecell'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TradesTableCell', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TradesTableCell />)
  })
})
