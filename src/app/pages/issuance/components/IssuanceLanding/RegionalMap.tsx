import React from 'react'
import { Chart } from 'react-google-charts'
import { VSpacer } from 'components/VSpacer'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { useInvestorsByCountry } from 'app/pages/issuance/hooks/useInvestorsByCountry'
import { useTheme } from '@mui/material/styles'

export const RegionalMap = () => {
  const { data, isLoading } = useInvestorsByCountry()
  const theme = useTheme()

  if (isLoading) {
    return null
  }

  const chartData = data ?? []

  return (
    <ChartWrapper title='Regional Map'>
      <VSpacer size='small' />
      <Chart
        chartType='GeoChart'
        data={[['Country', 'Popularity'], ...chartData]}
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        mapsApiKey='YOUR_KEY_HERE'
        options={{
          backgroundColor: 'transparent',
          defaultColor: theme.palette.primary.main
        }}
      />
    </ChartWrapper>
  )
}
