import { LiveTrackingPrice } from 'app/pages/exchange/components/LiveTrackingPrice/LiveTrackingPrice'
import * as useTradeHistory from 'app/pages/exchange/hooks/useTradeHistory'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { TrackingPrice } from 'app/pages/exchange/components/LiveTrackingPrice/TrackingPrice'
import * as useLastPrice from 'app/pages/exchange/hooks/useLastPrice'

jest.mock(
  'app/pages/exchange/components/LiveTrackingPrice/TrackingPrice',
  () => ({
    TrackingPrice: jest.fn(() => null)
  })
)

describe('LiveTrackingPrice', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = {
      marketTrades: [
        {
          price: 1000,
          side: 'BID'
        },
        {
          price: 900
        }
      ]
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    const useLastPriceResponse = { data: 1000 }

    jest
      .spyOn(useLastPrice, 'useLastPrice')
      .mockImplementation(() => useLastPriceResponse as any)

    render(<LiveTrackingPrice />)
  })

  it('renders null when data is undefined', () => {
    const objResponse = {
      marketTrades: undefined
    }

    const useLastPriceResponse = { data: 1000 }

    jest
      .spyOn(useLastPrice, 'useLastPrice')
      .mockImplementation(() => useLastPriceResponse as any)

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<LiveTrackingPrice />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders trend as up when price is equal to lastPrice and side is BID', () => {
    const objResponse = {
      marketTrades: [
        {
          price: 1000,
          side: 'BID'
        },
        {
          price: 900
        }
      ]
    }
    const useLastPriceResponse = { data: 1000 }

    jest
      .spyOn(useLastPrice, 'useLastPrice')
      .mockImplementation(() => useLastPriceResponse as any)

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    render(<LiveTrackingPrice />)

    expect(TrackingPrice).toHaveBeenCalledWith({ price: 1000, trend: 'up' }, {})
  })

  it('renders trend as down when side is ASK', () => {
    const objResponse = {
      marketTrades: [
        {
          price: 1000,
          side: 'ASK'
        },
        {
          price: 1200
        }
      ]
    }
    const useLastPriceResponse = { data: 900 }

    jest
      .spyOn(useLastPrice, 'useLastPrice')
      .mockImplementation(() => useLastPriceResponse as any)

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    render(<LiveTrackingPrice />)

    expect(TrackingPrice).toHaveBeenCalledWith(
      { price: 900, trend: 'down' },
      {}
    )
  })
})
