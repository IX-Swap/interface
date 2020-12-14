import React from 'react'
import { Chart } from 'react-google-charts'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { useTopInvestors } from '../../hooks/useTopInvestors'

export const TopInvestors = () => {
  const { data, isLoading } = useTopInvestors()

  if (isLoading || data === undefined) {
    return null
  }

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
        data={data}
        height={220}
        width={220}
        options={{
          pieHole: 0.5,
          pieStartAngle: -45,
          legend: {
            position: 'none'
          }
        }}
      />
    </ChartWrapper>
  )
}
