import React from 'react'
import { Chart } from 'react-google-charts'
import { DigitalSecurityOffering } from 'types/dso'
import { getDSOStats } from 'app/components/DSO/utils'
import { Box, Typography } from '@material-ui/core'

export interface AmountRaisedChartProps {
  dso: DigitalSecurityOffering
}

export const AmountRaisedChart = ({ dso }: AmountRaisedChartProps) => {
  // TODO: Replace with `getDSOStats` helper
  const { percentRaised } = getDSOStats(dso)

  const raised = Math.floor(percentRaised)
  const toRaise = 100 - raised

  return (
    <Box style={{ position: 'relative' }}>
      <Chart
        chartType='PieChart'
        loader={<div>Loading Chart</div>}
        data={[
          ['Investor', 'Amount'],
          ['', raised],
          ['', toRaise]
        ]}
        options={{
          pieHole: 0.75,
          pieStartAngle: 0,
          colors: ['rgb(245,189,37)', 'lightgrey'],
          legend: 'none',
          width: 72,
          height: 72
        }}
      />
      <Typography
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 9
        }}
      >
        {raised}%
      </Typography>
    </Box>
  )
}
