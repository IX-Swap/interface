import React from 'react'
import { render, cleanup } from 'test-utils'
import { MarketPortfolio } from 'app/pages/accounts/pages/dashboard/components/MarketPortfolio/MarketPortfolio'
import { chartData, fakeMarketInfo } from '__fixtures__/portfolio'
import { Chart } from 'react-google-charts'
import { NoMarketInfo } from 'app/pages/accounts/pages/dashboard/components/NoMarketInfo/NoMarketInfo'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/dashboard/components/NoMarketInfo/NoMarketInfo',
  () => ({
    NoMarketInfo: jest.fn(() => null)
  })
)

describe('MarketPortfolio', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders no market info component when data is undefined', () => {
    render(
      <MarketPortfolio
        currencySymbol={'S$'}
        type={'primary'}
        marketInfo={undefined}
      />
    )
    expect(NoMarketInfo).toBeCalledTimes(1)
  })

  it('renders chart component with correct props', () => {
    render(
      <MarketPortfolio
        currencySymbol={'S$'}
        type={'primary'}
        marketInfo={fakeMarketInfo}
      />
    )
    expect(NoMarketInfo).toBeCalledTimes(0)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: chartData
      }),
      {}
    )
  })
})
