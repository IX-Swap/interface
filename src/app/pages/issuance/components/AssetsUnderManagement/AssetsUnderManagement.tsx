import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { AssetUnderManagement } from 'types/vccDashboard'
import { AssetsUnderManagementSkeleton } from './AssetsUnderManagementSkeleton'

export interface AssetsUnderManagementProps {
  assets: AssetUnderManagement[] | undefined
  isLoading: boolean
}

export const AssetsUnderManagement = ({
  assets,
  isLoading
}: AssetsUnderManagementProps) => {
  const theme = useTheme()

  let data: Array<[string, string | number]> = [['Asset', 'Value']]

  if (assets !== undefined && assets.length > 0) {
    data = data.concat(assets.map(item => [item.dsoName, item.amount]))
  }

  if (isLoading) {
    return <AssetsUnderManagementSkeleton />
  }

  return (
    <InsightCard>
      <ChartWrapper title={'Assets Under Management'}>
        <Chart
          chartType='PieChart'
          loader={<div>Loading Chart</div>}
          data={data}
          height={'100%'}
          width={'100%'}
          options={{
            pieHole: 0.45,
            colors: ['#3266CC', '#990099', '#109619', '#FF9703', '#DC3812'],
            backgroundColor: 'transparent',
            legend: {
              position: 'right',
              textStyle: {
                color: theme.palette.getContrastText(
                  theme.palette.backgrounds.default as any
                ),
                fontSize: 14,
                fontName: 'Poppins'
              }
            },
            enableInteractivity: false,
            chartArea: {
              width: '100%',
              height: '80%',
              left: 0,
              right: 0,
              bottom: 0,
              top: '10%'
            },
            pieStartAngle: 330,
            pieSliceText: 'value + %'
          }}
        />
      </ChartWrapper>
    </InsightCard>
  )
}
