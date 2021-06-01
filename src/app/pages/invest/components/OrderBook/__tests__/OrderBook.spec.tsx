import {
  OrderBook,
  OrderBookProps
} from 'app/pages/invest/components/OrderBook/OrderBook'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OrderBook', () => {
  const props: OrderBookProps = {
    data: [],
    transaction: 'sell',
    tokenSymbol: 'IXPS',
    currency: 'SGD'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OrderBook {...props} />)
  })
})
