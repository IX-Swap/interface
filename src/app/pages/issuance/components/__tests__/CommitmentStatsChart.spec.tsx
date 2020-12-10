import React from 'react'
import { render } from 'test-utils'
import { Chart } from 'react-google-charts'
import { commitmentStatsData } from '__fixtures__/issuance'
import { CommitmentStatsChart } from '../CommitmentStatsChart'
import { ChartProps } from 'types/charts'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => 'Chart')
}))

describe('InvesmentGrowthChart', () => {
  const commitmentStatsChartProp: ChartProps = {
    data: commitmentStatsData,
    isLoading: false
  }

  const noData = [
    [
      { type: 'string', label: '' },
      { type: 'number', label: '' }
    ],
    ['MON', 25],
    ['TUE', 25],
    ['WED', 25],
    ['THU', 25],
    ['FRI', 25],
    ['SAT', 25],
    ['SUN', 25]
  ]

  it('renders without errors', () => {
    render(<CommitmentStatsChart {...commitmentStatsChartProp} />)
  })

  it('renders the chart when there is data', () => {
    render(<CommitmentStatsChart {...commitmentStatsChartProp} />)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({ data: commitmentStatsData }),
      {}
    )
  })

  it('renders the chart component with predefined data when there is no data', () => {
    render(<CommitmentStatsChart data={undefined} isLoading={false} />)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({ data: noData }),
      {}
    )
  })
})
