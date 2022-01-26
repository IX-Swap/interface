import React from 'react'
import { Chart } from 'react-google-charts'
import useStyles from 'app/pages/issuance/components/IssuanceLanding/DonutChart.styles'
import { Box, Typography } from '@mui/material'
import classnames from 'classnames'

export interface DonutChartProps {
  percent: number
  text?: number | string
  isNewThemeOn?: boolean
}

export const DonutChart = ({
  percent,
  text,
  isNewThemeOn = false
}: DonutChartProps) => {
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
          pieStartAngle: 270,
          colors: isNewThemeOn
            ? ['#F5BD25', '#EFF0F4']
            : ['rgb(245,189,37)', 'lightgrey'],
          legend: 'none',
          chartArea: {
            width: isNewThemeOn ? 58 : 48,
            height: isNewThemeOn ? 58 : 48
          },
          width: isNewThemeOn ? 58 : 48,
          height: isNewThemeOn ? 58 : 48,
          tooltip: { trigger: 'none' },
          enableInteractivity: false,
          backgroundColor: 'transparent'
        }}
      />
      <Typography
        className={classnames(classes.percent, {
          [classes.percentNew]: isNewThemeOn
        })}
      >
        {text !== undefined ? text : `${completed}%`}
      </Typography>
    </Box>
  )
}
