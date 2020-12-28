import React from 'react'
import { Chart } from 'react-google-charts'
import useStyles from 'app/pages/issuance/components/IssuanceLanding/DonutChart.styles'
import { Box, Typography } from '@material-ui/core'

export interface DonutChartProps {
  percent: number
  text?: number | string
}

export const DonutChart = ({ percent, text }: DonutChartProps) => {
  const classes = useStyles()

  const completed = isNaN(percent) ? 0 : Math.floor(percent ?? 0)
  const remaining = 100 - completed

  return (
    <Box style={{ position: 'relative' }}>
      <Chart
        chartType='PieChart'
        loader={<div></div>}
        data={[
          ['', ''],
          ['', completed],
          ['', remaining]
        ]}
        options={{
          pieHole: 0.75,
          pieStartAngle: 0,
          colors: ['rgb(245,189,37)', 'lightgrey'],
          legend: 'none',
          chartArea: {
            width: 48,
            height: 48
          },
          width: 48,
          height: 48,
          tooltip: { trigger: 'none' },
          enableInteractivity: false
        }}
      />
      <Typography className={classes.percent}>
        {text !== undefined ? text : `${completed}%`}
      </Typography>
    </Box>
  )
}
