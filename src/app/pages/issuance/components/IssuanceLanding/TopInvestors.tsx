import React from 'react'
import { Chart } from 'react-google-charts'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { useTopInvestors } from 'app/pages/issuance/hooks/useTopInvestors'

export const TopInvestors = () => {
  const { data, isLoading } = useTopInvestors()

  if (isLoading) {
    return null
  }

  const noData = [
    ['Investor', 'Amount'],
    ['', 100]
  ]
  const hasData = data !== undefined && data.length > 0

  return (
    <ChartWrapper title='Top Investors'>
      <Chart
        chartType='PieChart'
        loader={<div>Loading Chart</div>}
        data={hasData ? data : noData}
        height={220}
        width={220}
        options={{
          pieHole: 0.5,
          pieStartAngle: -45,
          colors: hasData ? undefined : ['lightgrey'],
          legend: {
            position: 'bottom'
          },
          enableInteractivity: hasData
        }}
      />
    </ChartWrapper>
  )
}
