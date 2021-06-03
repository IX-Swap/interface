import {
  OrderBookCell,
  OrderBookCellProps
} from 'app/pages/exchange/components/OrderBook/OrderBookCell'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OrderBookCell', () => {
  const props: OrderBookCellProps = {
    children: <></>,
    transaction: 'sell'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OrderBookCell {...props} />)
  })
})
