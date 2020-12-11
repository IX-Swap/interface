import React from 'react'
import { Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Chart } from 'react-google-charts'
import { ChartHeader } from './ChartHeader'
import { ChartProps } from 'types/charts'

export const CommitmentStatsChart: React.FC<ChartProps> = ({
  data,
  isLoading
}: ChartProps) => {
  const theme = useTheme()

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

  const hasData = typeof data !== 'undefined' && data.length > 0
  const gridColor = hasData ? theme.palette.text.secondary : 'transparent'
  const options = {
    colors: [theme.palette.primary.main],
    legend: { position: 'none' },
    chartArea: {
      width: '100%',
      height: '80%'
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
    <Box pt={4} pb={4} pl={3} pr={3}>
      <ChartHeader title='Commitment Stats' />
      {isLoading ? (
        <Box height='200px' />
      ) : (
        <Chart
          chartType={'ColumnChart'}
          data={hasData ? data : noData}
          options={options}
        />
      )}
    </Box>
  )
}
