import React from 'react'
import { render } from 'test-utils'
import { investmentGrowthData } from '__fixtures__/issuance'
import { InvestmentGrowthChart } from '../InvestmentGrowthChart'
import { ChartProps } from 'types/charts'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => 'Chart')
}))

describe('InvesmentGrowthChart', () => {
  const investmentGrowthChartProp: ChartProps = {
    data: investmentGrowthData,
    isLoading: false
  }

  it('renders without errors', () => {
    render(<InvestmentGrowthChart {...investmentGrowthChartProp} />)
  })
})
