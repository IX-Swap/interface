import React from 'react'
import { render } from 'test-utils'
import { Chart } from 'react-google-charts'
import { CommitmentStatsChart } from 'app/pages/issuance/components/CommitmentStatsChart'
import * as useCommitmentStatsHook from 'app/pages/issuance/hooks/useCommitmentStats'
import { generateQueryResult } from '__fixtures__/useQuery'
import {
  commitmentChartOption,
  commitmentChartData,
  commitmentChartNoDataOption
} from '__fixtures__/chart'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

describe('CommitmentStatsChart', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Chart with correct props', () => {
    jest.spyOn(useCommitmentStatsHook, 'useCommitmentStats').mockReturnValue(
      generateQueryResult({
        data: commitmentChartData,
        isLoading: false
      })
    )
    render(<CommitmentStatsChart />)
    expect(Chart).toHaveBeenNthCalledWith(
      1,
      {
        ...commitmentChartOption,
        options: {
          ...commitmentChartOption.options,
          hAxis: {
            ...commitmentChartOption.options.hAxis,
            gridlines: { color: '#778194' }
          },
          vAxis: {
            ...commitmentChartOption.options.vAxis,
            baselineColor: '#778194',
            gridlines: {
              ...commitmentChartOption.options.vAxis.gridlines,
              color: '#778194'
            }
          },
          colors: ['#4C88FF']
        }
      },
      {}
    )
  })

  it('renders Chart with correct props when there is no data', () => {
    jest.spyOn(useCommitmentStatsHook, 'useCommitmentStats').mockReturnValue(
      generateQueryResult({
        data: undefined,
        isLoading: false
      })
    )
    render(<CommitmentStatsChart />)
    expect(Chart).toHaveBeenNthCalledWith(
      1,
      {
        ...commitmentChartNoDataOption,
        options: {
          ...commitmentChartNoDataOption.options,
          colors: ['#4C88FF']
        }
      },
      {}
    )
  })
})