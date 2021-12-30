import {
  OrderBook,
  OrderBookProps
} from 'app/pages/exchange/components/OrderBook/OrderBook'
import React from 'react'
import { render } from 'test-utils'

describe('OrderBook', () => {
  const props: OrderBookProps = {
    data: [],
    transaction: 'sell',
    tokenSymbol: 'IXPS',
    currency: 'SGD'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<OrderBook {...props} />)
  })
})
