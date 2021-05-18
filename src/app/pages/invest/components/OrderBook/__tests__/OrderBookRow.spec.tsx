import {
  OrderBookRow,
  OrderBookRowProps
} from 'app/pages/invest/components/OrderBook/OrderBookRow'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OrderBookRow', () => {
  const props: OrderBookRowProps = {
    price: 123,
    amount: 345,
    total: 566
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OrderBookRow {...props} />)
  })
})
