import React from 'react'
import { render } from 'test-utils'
import { Chart } from 'react-google-charts'
import { InvestmentGrowthChart } from 'app/pages/issuance/components/InvestmentGrowthChart'
import * as useInvestmentGrowthHook from 'app/pages/issuance/hooks/useInvestmentGrowth'
import { generateQueryResult } from '__fixtures__/useQuery'
import {
  investmentGrowthChartData,
  investmentGrowthChartOptions,
  investmentChartNoDataText
} from '__fixtures__/chart'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

describe('InvestmentGrowthChart', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Chart with correct props', () => {
    jest.spyOn(useInvestmentGrowthHook, 'useInvestmentGrowth').mockReturnValue(
      generateQueryResult({
        data: investmentGrowthChartData,
        isLoading: false
      })
    )
    render(<InvestmentGrowthChart />)
    expect(Chart).toHaveBeenNthCalledWith(
      1,
      {
        ...investmentGrowthChartOptions,
        options: {
          ...investmentGrowthChartOptions.options,
          colors: ['#4C88FF']
        }
      },
      {}
    )
  })

  it('renders no data text when there is no data', () => {
    jest.spyOn(useInvestmentGrowthHook, 'useInvestmentGrowth').mockReturnValue(
      generateQueryResult({
        data: undefined,
        isLoading: false
      })
    )
    const { getByText } = render(<InvestmentGrowthChart />)
    expect(getByText(investmentChartNoDataText)).toBeTruthy()
  })
})
