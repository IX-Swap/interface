import React from 'react'
import { render, cleanup } from 'test-utils'
import { MarketPortfolio } from 'app/pages/accounts/pages/dashboard/components/MarketPortfolio/MarketPortfolio'
import { chartData, fakeMarketInfo } from '__fixtures__/portfolio'
import { Chart } from 'react-google-charts'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

describe('MarketPortfolio', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders chart component with correct props', () => {
    render(
      <MarketPortfolio
        currencySymbol={'S$'}
        type={'primary'}
        marketInfo={fakeMarketInfo}
      />
    )
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: chartData
      }),
      {}
    )
  })
})
