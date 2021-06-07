import { MarketTrades } from 'app/pages/exchange/components/Trades/MarketTrades'
import * as useTradeHistory from 'app/pages/exchange/hooks/useTradeHistory'
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
