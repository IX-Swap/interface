import {
  TradesTableRow,
  TradesTableRowProps
} from 'app/pages/exchange/components/Trades/TradesTableRow'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TradesTableRow', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const props: TradesTableRowProps = {
      price: 123,
      amount: 12,
      time: '13: 12: 12',
      transaction: 'buy'
    }
    render(<TradesTableRow {...props} />)
  })
})
