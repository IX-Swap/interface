import React from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Chart } from 'react-google-charts'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { useCommitmentStats } from '../hooks/useCommitmentStats'
import { getWeekDays } from 'helpers/getWeekDays'
import { prepareChartData } from 'helpers/prepareChartData'
import { subDays } from 'date-fns'

export const CommitmentStatsChart = () => {
  const theme = useTheme()
  const { data, isLoading } = useCommitmentStats()

  const noData = [
    [
      { type: 'date', label: 'Date' },
      { type: 'number', label: 'Count' }
    ],
    [new Date(subDays(Date.now(), 6)), 25],
    [new Date(subDays(Date.now(), 5)), 25],
    [new Date(subDays(Date.now(), 4)), 25],
    [new Date(subDays(Date.now(), 3)), 25],
    [new Date(subDays(Date.now(), 2)), 25],
    [new Date(subDays(Date.now(), 1)), 25],
    [new Date(Date.now()), 25]
  ]

  const hasData = data !== undefined && data.length > 0
  const dateTicks = getWeekDays(data?.slice(1).reverse() ?? noData.slice(1))

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
      ticks: dateTicks,
      baselineColor: 'transparent',
      gridlines: {
        color: gridColor
      },
      textStyle: {
        color: theme.palette.getContrastText(theme.palette.backgrounds.default)
      }
    },
    vAxis: {
      textPosition: 'none',
      ticks: hasData ? undefined : [1, 1000],
      gridlines: {
        color: gridColor,
        count: 3
      },
      baselineColor: gridColor
    },
    backgroundColor: 'transparent',
    enableInteractivity: hasData
  }

  return (
    <ChartWrapper title='Commitment Stats'>
      {isLoading ? (
        <Box height='200px' />
      ) : (
        <Chart
          chartType={'ColumnChart'}
          data={prepareChartData(hasData ? data : noData)}
          options={options}
          height={250}
        />
      )}
    </ChartWrapper>
  )
}
