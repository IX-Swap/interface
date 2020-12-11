import React from 'react'
import { render } from 'test-utils'
import { Chart } from 'react-google-charts'
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

  it('renders the chart when there is data', () => {
    render(<InvestmentGrowthChart {...investmentGrowthChartProp} />)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({ data: investmentGrowthData }),
      {}
    )
  })

  it('renders the NoChartData component when there is no data', () => {
    const { getByTestId } = render(
      <InvestmentGrowthChart data={undefined} isLoading={false} />
    )
    expect(getByTestId('no-chart-data')).not.toBeNull()
  })
})
