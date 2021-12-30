import {
  OrderBookCell,
  OrderBookCellProps
} from 'app/pages/exchange/components/OrderBook/OrderBookCell'
import React from 'react'
import { render } from 'test-utils'

describe('OrderBookCell', () => {
  const props: OrderBookCellProps = {
    children: <></>,
    transaction: 'sell'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<OrderBookCell {...props} />)
  })
})
