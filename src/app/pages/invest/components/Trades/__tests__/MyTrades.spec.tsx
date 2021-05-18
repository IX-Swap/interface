import { MyTrades } from 'app/pages/invest/components/Trades/MyTrades'
import * as useTradeHistory from 'app/pages/invest/hooks/useTradeHistory'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('MyTrades', () => {
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

    render(<MyTrades />)
  })

  it('renders null when data is undefined', () => {
    const objResponse = {
      data: undefined
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<MyTrades />)
    expect(container).toBeEmptyDOMElement()
  })
})
