import { TopSection } from 'app/pages/invest/components/Market/MarketTabbedView/TopSection'
import React from 'react'
import { render, fireEvent } from 'test-utils'
import { MarketTrades } from 'app/pages/invest/components/Trades/MarketTrades'
import { InvestorLiveOrderBook } from 'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'

jest.mock(
  'app/pages/invest/components/TVChartContainer/TVChartContainer',
  () => ({
    TVChartContainer: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook',
  () => ({
    InvestorLiveOrderBook: jest.fn(() => null)
  })
)

jest.mock('app/pages/invest/components/Trades/MarketTrades', () => ({
  MarketTrades: jest.fn(() => null)
}))

describe('TopSection', () => {
  const props = {
    symbol: 'SYMBOL',
    datafeed: undefined
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

  it('renders correct tab', () => {
    const { getByRole } = render(<TopSection {...props} />)
    const chartTabButton = getByRole('tab', {
      name: 'Chart'
    }) as HTMLButtonElement
    const orderTabButton = getByRole('tab', {
      name: 'Market Order'
    }) as HTMLButtonElement
    const tradesTabButton = getByRole('tab', {
      name: 'Market Trades'
    }) as HTMLButtonElement

    fireEvent.click(chartTabButton, { bubbles: true, cancellable: true })
    expect(TVChartContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        symbol: 'SYMBOL',
        theme: 'Dark',
        toolbarBg: '#292929'
      }),
      {}
    )

    fireEvent.click(orderTabButton, { bubbles: true, cancellable: true })
    expect(InvestorLiveOrderBook).toHaveBeenCalled()

    fireEvent.click(tradesTabButton, { bubbles: true, cancellable: true })
    expect(MarketTrades).toHaveBeenCalled()
  })
})
