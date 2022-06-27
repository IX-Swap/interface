import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { NoChartData } from './NoChartData'
import { getWeekDays } from 'helpers/getWeekDays'
import { useInvestmentGrowth } from '../hooks/useInvestmentGrowth'
import { prepareChartData } from 'helpers/prepareChartData'

export const InvestmentGrowthChart = () => {
  const theme = useTheme()
  const { data, isLoading } = useInvestmentGrowth()

  const hasData = data !== undefined && data.length > 0

  const dateTicks = hasData ? getWeekDays(data.slice(1)) : undefined

  const textStyle = {
    color: theme.palette.getContrastText(theme.palette.backgrounds.default)
  }
  const options = {
    chart: {
      title: 'Investment Growth Chart'
    },
    hAxis: {
      format: 'E',
      ticks: dateTicks ?? undefined,
      baselineColor: 'transparent',
      textStyle
    },
    vAxis: {
      baselineColor: 'transparent',
      gridlines: {
        count: 5
      },
      textStyle
    },
    colors: [theme.palette.primary.main],
    height: 220,
    chartArea: {
      width: '85%',
      height: '80%',
      left: '20px'
    },
    legend: 'none',
    backgroundColor: 'transparent'
  }

  return (
    <ChartWrapper title='Investment Growth Chart'>
      {isLoading ? (
        <Box height='200px' />
      ) : hasData ? (
        <Chart
          chartType={'LineChart'}
          data={prepareChartData(data)}
          options={options}
        />
      ) : (
        <NoChartData text='There is no investment at the moment. Once you receive investments in your deal you will be able to see all the charts.' />
      )}
    </ChartWrapper>
  )
}
