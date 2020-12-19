import React from 'react'
import { Chart } from 'react-google-charts'
import { DigitalSecurityOffering } from 'types/dso'

export interface AmountRaisedChartProps {
  dso: DigitalSecurityOffering
}

export const AmountRaisedChart = ({ dso }: AmountRaisedChartProps) => {
  // TODO: Replace with `getDSOStats` helper
  const percentRaised =
    (dso.insight.raisedTotal * 100) / (dso.totalFundraisingAmount ?? 0)

  const raised = Math.floor(Math.min(100, percentRaised))
  const toRaise = 100 - raised

  return (
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
        pieStartAngle: -45,
        colors: ['green', 'lightgrey'],
        legend: 'none',
        width: 72,
        height: 72
      }}
    />
  )
}
