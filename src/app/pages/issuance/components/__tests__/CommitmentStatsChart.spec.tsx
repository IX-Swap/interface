import React from 'react'
import { render } from 'test-utils'
import { commitmentStatsData } from '__fixtures__/issuance'
import { CommitmentStatsChart } from '../CommitmentStatsChart'
import { ChartProps } from 'types/charts'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => 'Chart')
}))

describe('CommitmentStatsChart', () => {
  const commitmentStatsChartProp: ChartProps = {
    data: commitmentStatsData,
    isLoading: false
  }

  it('renders without errors', () => {
    render(<CommitmentStatsChart {...commitmentStatsChartProp} />)
  })
})
