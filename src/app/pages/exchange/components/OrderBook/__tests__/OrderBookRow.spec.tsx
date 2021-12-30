import {
  OrderBookRow,
  OrderBookRowProps
} from 'app/pages/exchange/components/OrderBook/OrderBookRow'
import React from 'react'
import { render } from 'test-utils'

describe('OrderBookRow', () => {
  const props: OrderBookRowProps = {
    price: 123,
    amount: 345,
    total: 566
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<OrderBookRow {...props} />)
  })
})
