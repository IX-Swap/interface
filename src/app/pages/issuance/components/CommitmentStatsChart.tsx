import React from 'react'
import { Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Chart } from 'react-google-charts'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { ChartProps } from 'types/charts'
import { useCommitmentStats } from '../hooks/useCommitmentStats'
import { getWeekDays } from 'helpers/getWeekDays'
import { prepareChartData } from 'helpers/prepareChartData'

export const CommitmentStatsChart: React.FC<ChartProps> = () => {
  const theme = useTheme()
  const { data, isLoading } = useCommitmentStats()

  const noData = [
    [
      { type: 'date', label: 'Date' },
      { type: 'number', label: 'Count' }
    ],
    [new Date(2020, 11, 13), 25],
    [new Date(2020, 11, 13), 25],
    [new Date(2020, 11, 15), 25],
    [new Date(2020, 11, 16), 25],
    [new Date(2020, 11, 17), 25],
    [new Date(2020, 11, 18), 25],
    [new Date(2020, 11, 19), 25]
  ]

  const hasData = data !== undefined && data.length > 0
  const dateTicks = hasData ? getWeekDays(data.slice(1).reverse()) : undefined

  const gridColor = hasData ? theme.palette.text.secondary : 'transparent'
  const options = {
    colors: [theme.palette.primary.main],
    legend: { position: 'none' },
    chartArea: {
      width: '100%',
      height: '80%'
    },
    hAxis: {
      format: 'E',
      ticks: dateTicks ?? undefined,
      baselineColor: 'transparent'
    },
    vAxis: {
      textPosition: 'none',
      ticks: hasData ? undefined : [1, 1000],
      gridlines: {
        color: gridColor,
        count: 3
      },
      baselineColor: gridColor
    }
  }

  return (
    <ChartWrapper title='Commitment Stats'>
      {isLoading ? (
        <Box height='200px' />
      ) : (
        <Chart
          chartType={'ColumnChart'}
          data={hasData ? prepareChartData(data) : noData}
          options={options}
        />
      )}
    </ChartWrapper>
  )
}
