import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/CapTable/InsightCard'

export const AccountsUnderCustody = () => {
  const theme = useTheme()
  // TODO Add correct load data function after complete backend api endpoint
  // const { data, isLoading } = useTopInvestors()

  // TODO Uncomment next 3 lines after complete backend api endpoint
  // if (isLoading) {
  //   return null
  // }

  const noData = [
    ['HEX', 'InvestaX'],
    ['HEX', 20],
    ['InvestaX', 80]
  ]
  // TODO Uncomment next line after complete backend api endpoint
  // const hasData = data !== undefined && data.length > 0
  // TODO Remove next line after complete backend api endpoint
  const hasData = false

  return (
    <InsightCard>
      <ChartWrapper title={'Accounts Under Custody'}>
        <Chart
          chartType='PieChart'
          loader={<div>Loading Chart</div>}
          // TODO Uncomment next line after complete backend api endpoint
          // data={hasData ? data : noData}
          // TODO Remove next line after complete backend api endpoint
          data={noData}
          height={'100%'}
          width={'100%'}
          options={{
            pieHole: 0.35,
            colors: ['#109619', '#3266CC'],
            backgroundColor: 'transparent',
            legend: !hasData
              ? {
                  position: 'right',
                  textStyle: {
                    color: theme.palette.getContrastText(
                      theme.palette.backgrounds.default as any
                    ),
                    fontSize: 12,
                    fontName: 'Poppins'
                  }
                }
              : 'none',
            enableInteractivity: hasData,
            chartArea: {
              width: '100%',
              height: '80%',
              left: 0,
              right: 0,
              bottom: 0,
              top: '10%'
            },
            pieSliceText: 'value'
          }}
        />
      </ChartWrapper>
    </InsightCard>
  )
}
