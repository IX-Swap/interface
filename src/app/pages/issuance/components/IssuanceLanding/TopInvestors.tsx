import React from 'react'
import { Chart } from 'react-google-charts'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { useTopInvestors } from 'app/pages/issuance/hooks/useTopInvestors'
import { useTheme } from '@material-ui/core/styles'

export type LegendPosition = 'right' | 'left' | 'bottom' | 'top'
export interface TopInvestorsProps {
  title?: string
  position?: LegendPosition
}

export const TopInvestors = ({
  position = 'bottom',
  title = 'Top Investors'
}: TopInvestorsProps) => {
  const { data, isLoading } = useTopInvestors()
  const theme = useTheme()

  if (isLoading) {
    return null
  }

  const noData = [
    ['Investor', 'Amount'],
    ['', 100]
  ]
  const hasData = data !== undefined && data.length > 0

  return (
    <ChartWrapper title={title}>
      <Chart
        chartType='PieChart'
        loader={<div>Loading Chart</div>}
        data={hasData ? data : noData}
        height={'100%'}
        width={'100%'}
        options={{
          pieHole: 0.35,
          pieStartAngle: -45,
          colors: hasData ? undefined : ['lightgrey'],
          backgroundColor: 'transparent',
          pieSliceText: hasData ? 'percentage' : 'label',
          legend: hasData
            ? {
                position: position,
                alignment: 'center',
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
            bottom: '5%',
            top: '10%'
          }
        }}
      />
    </ChartWrapper>
  )
}
