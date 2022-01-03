import { NoData } from 'app/pages/issuance/components/LineChart/NoData'
import React from 'react'
import Chart from 'react-google-charts'

export interface LineChartProps {
  data: any[] | undefined
}

export const LineChart = ({ data }: LineChartProps) => {
  if (data === undefined) {
    return <NoData />
  }

  return (
    <>
      <Chart
        chartType='LineChart'
        data={data}
        options={{
          height: 400,
          colors: ['#FF9703', '#109619', '#990099', '#3266CC', '#03FF59'],
          chartArea: {
            left: 40,
            top: 30,
            width: '95%',
            height: 300
          },
          tooltip: { isHtml: true },
          legend: { position: 'bottom', alignment: 'start' },
          vAxis: { format: '#' },
          hAxis: {
            baselineColor: 'transparent',
            gridlines: {
              color: 'transparent'
            },
            textStyle: {
              color: 'rgba(0, 0, 0, 0)'
            }
          }
        }}
      />
    </>
  )
}
