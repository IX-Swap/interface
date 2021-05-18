import {
  OrderBookHeader,
  OrderBookHeaderProps
} from 'app/pages/invest/components/OrderBook/OrderBookHeader'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('OrderBookHeader', () => {
  const props: OrderBookHeaderProps = {
    tokenSymbol: 'IXPS',
    currency: 'SGD'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<OrderBookHeader {...props} />)
  })
})
