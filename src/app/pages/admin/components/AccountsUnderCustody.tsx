import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@mui/material/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { useGetCustodiansCount } from 'app/pages/admin/hooks/useGetCustodiansCount'

export const AccountsUnderCustody = () => {
  const theme = useTheme()

  const { data, isLoading } = useGetCustodiansCount()

  if (isLoading || data === undefined) {
    return null
  }

  const chartData = [
    ['HEX', 'InvestaX'],
    ['HEX', data.hexCount],
    ['InvestaX', data.investaxCount]
  ]

  return (
    <InsightCard>
      <ChartWrapper title={'Accounts Under Custody'}>
        <Chart
          chartType='PieChart'
          loader={<div>Loading Chart</div>}
          data={chartData}
          height={'100%'}
          width={'100%'}
          options={{
            pieHole: 0.35,
            colors: ['#109619', '#3266CC'],
            backgroundColor: 'transparent',
            legend: {
              position: 'right',
              textStyle: {
                color: theme.palette.getContrastText(
                  theme.palette.backgrounds.default as any
                ),
                fontSize: 12,
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
            pieSliceText: 'value + %'
          }}
        />
      </ChartWrapper>
    </InsightCard>
  )
}
