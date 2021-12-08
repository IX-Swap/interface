import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/CapTable/InsightCard'

export const AssetsUnderManagement = () => {
  const theme = useTheme()

  // TODO Add real data after complete backend api endpoint
  const fakeChartData = [
    ['Asset', 'Value'],
    ['IXD SF 1', 30],
    ['IXD SF 2', 25],
    ['IXD SF 3', 20],
    ['IXD SF 4', 15],
    ['IXD SF 5', 10]
  ]

  return (
    <InsightCard>
      <ChartWrapper title={'Assets Under Management'}>
        <Chart
          chartType='PieChart'
          loader={<div>Loading Chart</div>}
          data={fakeChartData}
          height={'100%'}
          width={'100%'}
          options={{
            pieHole: 0.35,
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
