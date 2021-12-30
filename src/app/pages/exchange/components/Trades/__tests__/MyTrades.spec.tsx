import { MyTrades } from 'app/pages/exchange/components/Trades/MyTrades'
import * as useTradeHistory from 'app/pages/exchange/hooks/useTradeHistory'
import React from 'react'
import { render } from 'test-utils'

describe('MyTrades', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
