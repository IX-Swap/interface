import React from 'react'
import { render, cleanup } from 'test-utils'
import { MarketPortfolio } from 'app/pages/accounts/pages/dashboard/components/MarketPortfolio/MarketPortfolio'
import { fakeMarketInfo } from '__fixtures__/portfolio'
import { Chart } from 'react-google-charts'
import { formatDecimal } from 'helpers/numbers'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

const fakeMarketInfoWithOthers = { ...fakeMarketInfo, totalAmount: 20000 }

const chartData = [
  ['Markets', 'Fund Status'],
  [
    `Fund (${formatDecimal(fakeMarketInfo.fundAmount)})`,
    fakeMarketInfo.fundAmount
  ],
  [
    `Debt (${formatDecimal(fakeMarketInfo.debtAmount)})`,
    fakeMarketInfo.debtAmount
  ],
  [
    `Equity (${formatDecimal(fakeMarketInfo.equityAmount)})`,
    fakeMarketInfo.equityAmount
  ],
  [
    `Hybrid (${formatDecimal(fakeMarketInfo.hybridAmount)})`,
    fakeMarketInfo.hybridAmount
  ]
]

const chartDataWithOthers = [
  ['Markets', 'Fund Status'],
  [
    `Fund (${formatDecimal(fakeMarketInfoWithOthers.fundAmount)})`,
    fakeMarketInfoWithOthers.fundAmount
  ],
  [
    `Debt (${formatDecimal(fakeMarketInfoWithOthers.debtAmount)})`,
    fakeMarketInfoWithOthers.debtAmount
  ],
  [
    `Equity (${formatDecimal(fakeMarketInfoWithOthers.equityAmount)})`,
    fakeMarketInfoWithOthers.equityAmount
  ],
  [
    `Hybrid (${formatDecimal(fakeMarketInfoWithOthers.hybridAmount)})`,
    fakeMarketInfoWithOthers.hybridAmount
  ],
  [
    `Others (${formatDecimal(
      fakeMarketInfoWithOthers.totalAmount -
        (fakeMarketInfoWithOthers.fundAmount +
          fakeMarketInfoWithOthers.debtAmount +
          fakeMarketInfoWithOthers.equityAmount +
          fakeMarketInfoWithOthers.hybridAmount)
    )})`,
    fakeMarketInfoWithOthers.totalAmount -
      (fakeMarketInfoWithOthers.fundAmount +
        fakeMarketInfoWithOthers.debtAmount +
        fakeMarketInfoWithOthers.equityAmount +
        fakeMarketInfoWithOthers.hybridAmount)
  ]
]

describe('MarketPortfolio', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <MarketPortfolio
        currencySymbol={'S$'}
        type={'primary'}
        marketInfo={fakeMarketInfo}
      />
    )
  })

  it('renders without error', () => {
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

  it('renders without error', () => {
    render(
      <MarketPortfolio
        currencySymbol={'S$'}
        type={'primary'}
        marketInfo={fakeMarketInfoWithOthers}
      />
    )
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: chartDataWithOthers
      }),
      {}
    )
  })
})
