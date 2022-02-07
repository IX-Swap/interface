import {
  MarketGridView,
  MarketViewProps
} from 'app/pages/exchange/components/Market/MarketGridView'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { render } from 'test-utils'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'

jest.mock('app/pages/exchange/components/Trades/Trades', () => ({
  Trades: jest.fn(() => null)
}))

jest.mock(
  'app/pages/exchange/components/InvestorLiveOrderBook/InvestorLiveOrderBook',
  () => ({
    InvestorLiveOrderBook: jest.fn(() => null)
  })
)

jest.mock('app/pages/exchange/components/MyOrders/MyOrders', () => ({
  MyOrders: jest.fn(() => null)
}))

jest.mock(
  'app/pages/invest/components/TVChartContainer/TVChartContainer',
  () => ({
    TVChartContainer: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm',
  () => ({
    PlaceOrderForm: jest.fn(() => null)
  })
)

describe('MarketGridView', () => {
  const props: MarketViewProps = {
    symbol: 'SYMBOL',
    datafeed: undefined,
    createOrderStatus: 'success',
    isFetching: false,
    currencyName: 'SGD',
    tokenName: 'Token Name',
    currencyBalance: 10000,
    tokenBalance: { data: { amount: 1000 } },
    submitForm: jest.fn()
  }

  beforeEach(() => {
    const objResponse = {
      theme: {
        palette: {
          mode: 'dark'
        }
      }
    }

    jest
      .spyOn(useAppBreakpoints, 'useAppBreakpoints')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TVCharContainer correctly when symbol is defined and theme is dark', () => {
    render(<MarketGridView {...props} />)
    expect(TVChartContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        symbol: 'SYMBOL',
        theme: 'Dark',
        toolbarBg: '#292929'
      }),
      {}
    )
  })

  it('renders TVCharContainer correctly when symbol is defined and theme is light', () => {
    const objResponse = {
      theme: {
        palette: {
          mode: 'light'
        }
      }
    }

    jest
      .spyOn(useAppBreakpoints, 'useAppBreakpoints')
      .mockImplementation(() => objResponse as any)

    render(<MarketGridView {...props} />)
    expect(TVChartContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        symbol: 'SYMBOL',
        theme: 'Light',
        toolbarBg: ''
      }),
      {}
    )
  })

  it('does not renders TVCharContainer when symbol length < 0', () => {
    render(<MarketGridView {...props} symbol={''} />)
    expect(TVChartContainer).not.toHaveBeenCalled()
  })

  it('render PlaceOrderForm with correct tokenBalance props when tokenBalance is defined', () => {
    render(<MarketGridView {...props} />)
    expect(PlaceOrderForm).toHaveBeenCalledWith(
      expect.objectContaining({
        tokenBalance: 1000
      }),
      {}
    )
  })

  it('render PlaceOrderForm with correct tokenBalance props when tokenBalance is undefined', () => {
    render(<MarketGridView {...props} tokenBalance={undefined} />)
    expect(PlaceOrderForm).toHaveBeenCalledWith(
      expect.objectContaining({
        tokenBalance: 0
      }),
      {}
    )
  })
})
