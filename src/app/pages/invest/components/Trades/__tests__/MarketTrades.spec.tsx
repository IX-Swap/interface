import { MarketTrades } from 'app/pages/invest/components/Trades/MarketTrades'
import * as useTradeHistory from 'app/pages/invest/hooks/useTradeHistory'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('MarketTrades', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = {
      data: []
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    render(<MarketTrades />)
  })

  it('renders null when data is undefined', () => {
    const objResponse = {
      data: undefined
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<MarketTrades />)
    expect(container).toBeEmptyDOMElement()
  })
})
