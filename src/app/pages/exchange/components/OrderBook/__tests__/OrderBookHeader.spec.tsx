import {
  OrderBookHeader,
  OrderBookHeaderProps
} from 'app/pages/exchange/components/OrderBook/OrderBookHeader'
import React from 'react'
import { render } from 'test-utils'

describe('OrderBookHeader', () => {
  const props: OrderBookHeaderProps = {
    tokenSymbol: 'IXPS',
    currency: 'SGD'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<OrderBookHeader {...props} />)
  })
})
