import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { format } from 'date-fns'
import { timeRange } from 'app/pages/home/utils'
import Chart from 'kaktana-react-lightweight-charts'

export interface TimeSeries {
  time: string
  value: number
}

export interface TimeSeriesChartProps {
  data: TimeSeries[]
  range: '1W' | '1M' | '6M' | 'YTD' | '1Y' | 'MAX'
}

export const TimeSeriesChart = ({ data, range }: TimeSeriesChartProps) => {
  const theme = useTheme()

  const areaSeries = [
    {
      data,
      options: {
        topColor: theme.palette.primary.main,
        bottomColor: 'rgba(255, 255, 255, 0)',
        lineColor: theme.palette.primary.main,
        priceFormat: {
          type: 'custom',
          formatter: (price: number) => `$ ${price}`
        }
      }
    }
  ]
  const options = {
    timeScale: {
      tickMarkFormatter: (time: {
        month: string
        day: string
        year: string
      }) => {
        const timeString = `${time.month}/${time.day}/${time.year}`
        const dateObj = new Date(timeString)
        return format(dateObj, 'LLL d, yyyy')
      }
    },
    localization: {
      locale: 'en-US'
    },
    handleScale: false
  }
  const seriesTimeRange = timeRange(range, data)

  return (
    <Chart
      options={options}
      areaSeries={areaSeries}
      height={300}
      autoWidth
      to={seriesTimeRange.to as any}
      from={seriesTimeRange.from as any}
    />
  )
}
