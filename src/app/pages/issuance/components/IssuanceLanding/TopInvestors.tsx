import React from 'react'
import { Chart } from 'react-google-charts'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'

const topInvestorsData = [
  ['James Roy', 3000],
  ['Aurthur Doe', 2500],
  ['Raul Garcia', 2000],
  ['Mike Johnson', 1500],
  ['Robert Moreno', 1000]
]

export const TopInvestors = () => {
  const data: any[] = topInvestorsData

  if (data.length === 0) {
    return (
      <Chart
        width={'300px'}
        height={'300px'}
        chartType='PieChart'
        loader={<div>Loading Chart</div>}
        data={[
          ['Investor', 'Amount'],
          ['', 100]
        ]}
        options={{
          title: 'Top Investors',
          pieHole: 0.5,
          pieStartAngle: -45,
          colors: ['lightgrey'],
          legend: 'none'
        }}
      />
    )
  }

  return (
    <ChartWrapper title='Top Investors'>
      <Chart
        chartType='PieChart'
        loader={<div>Loading Chart</div>}
        data={[['Investor', 'Amount'], ...data]}
        options={{
          pieHole: 0.5,
          pieStartAngle: -45,
          legend: {
            position: 'bottom',
            textStyle: { fontSize: 14 },
            maxLines: 4
          }
        }}
      />
    </ChartWrapper>
  )
}
