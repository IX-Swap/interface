import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { AssetUnderManagement } from 'types/vccDashboard'

export interface AssetsUnderManagementProps {
  assets: AssetUnderManagement[] | undefined
}

export const AssetsUnderManagement = ({
  assets
}: AssetsUnderManagementProps) => {
  const theme = useTheme()

  if (assets === undefined || assets.length < 1) {
    return null
  }

  const data = [
    ['Asset', 'Value'],
    ...assets.map(item => [item.dsoName, item.amount])
  ]

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
