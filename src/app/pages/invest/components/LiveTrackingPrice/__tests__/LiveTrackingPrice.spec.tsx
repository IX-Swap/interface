import { LiveTrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/LiveTrackingPrice'
import * as useTradeHistory from 'app/pages/invest/hooks/useTradeHistory'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { TrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/TrackingPrice'

jest.mock('app/pages/invest/__tests__/LiveTrackingPrice/TrackingPrice', () => ({
  TrackingPrice: jest.fn(() => null)
}))

describe('LiveTrackingPrice', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = {
      data: [
        {
          price: 1000
        },
        {
          price: 900
        }
      ]
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    render(<LiveTrackingPrice />)
  })

  it('renders null when data is undefined', () => {
    const objResponse = {
      data: undefined
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<LiveTrackingPrice />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders trend as up when price increase', () => {
    const objResponse = {
      data: [
        {
          price: 1000
        },
        {
          price: 900
        }
      ]
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    render(<LiveTrackingPrice />)

    expect(TrackingPrice).toHaveBeenCalledWith({ price: 1000, trend: 'up' }, {})
  })

  it('renders trend as up when tradeHistory data length is 1', () => {
    const objResponse = {
      data: [
        {
          price: 1000
        }
      ]
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    render(<LiveTrackingPrice />)

    expect(TrackingPrice).toHaveBeenCalledWith({ price: 1000, trend: 'up' }, {})
  })

  it('renders trend as down when price decreased', () => {
    const objResponse = {
      data: [
        {
          price: 1000
        },
        {
          price: 1200
        }
      ]
    }

    jest
      .spyOn(useTradeHistory, 'useTradeHistory')
      .mockImplementation(() => objResponse as any)

    render(<LiveTrackingPrice />)

    expect(TrackingPrice).toHaveBeenCalledWith(
      { price: 1000, trend: 'down' },
      {}
    )
  })
})
