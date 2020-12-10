import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { ChartHeader } from './ChartHeader'
import { NoChartData } from './NoChartData'
import { ChartProps } from 'types/charts'
import { getWeekDays } from 'helpers/getWeekDays'

export const InvestmentGrowthChart: React.FC<ChartProps> = ({
  data,
  isLoading
}: ChartProps) => {
  const theme = useTheme()

  const hasData = typeof data !== 'undefined' && data.length > 0

  const dateTicks = getWeekDays(data)

  const options = {
    chart: {
      title: 'Investment Growth Chart'
    },
    hAxis: {
      format: 'E',
      ticks: dateTicks ?? undefined,
      baselineColor: 'transparent'
    },
    vAxis: {
      baselineColor: 'transparent',
      gridlines: {
        count: 5
      }
    },
    colors: [theme.palette.primary.main],
    height: 220,
    chartArea: {
      width: '85%',
      height: '80%',
      left: '20px'
    },
    legend: 'none'
  }

  return (
    <Box pt={4} pb={4} pl={3} pr={0} minHeight='300px'>
      <ChartHeader title={'Investment Growth Chart'} />
      {isLoading ? (
        <Box height='200px' />
      ) : hasData ? (
        <Chart chartType={'LineChart'} data={data} options={options} />
      ) : (
        <NoChartData text='There is no investment at the moment. Once you receive investments in your deal you will be able to see all the charts.' />
      )}
    </Box>
  )
}
