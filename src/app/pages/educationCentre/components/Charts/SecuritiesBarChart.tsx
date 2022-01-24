import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import { getChartData } from 'app/pages/educationCentre/utils'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import Chart from 'react-google-charts'

export interface SecuritiesBarChartProps {
  data: Security[]
}

export const SecuritiesBarChart = ({ data }: SecuritiesBarChartProps) => {
  const { getFilterValue } = useQueryFilter()
  const category = getFilterValue('category')
  const chartData = getChartData(data, category as any)

  return (
    <Chart
      chartType='ColumnChart'
      width='100%'
      height={450}
      data={chartData}
      options={{
        hAxis: {
          title: category
        },
        vAxis: {
          title: 'Percentage of Securities',
          ticks: [0, 25, 50, 75, 100]
        },
        legend: { position: 'none' },
        tooltip: {
          trigger: 'none'
        },
        annotations: { alwaysOutside: true },
        animation: {
          duration: 250,
          easing: 'out'
        }
      }}
    />
  )
}
