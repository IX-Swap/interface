import React from 'react'
import { Chart } from 'react-google-charts'
import { VSpacer } from 'components/VSpacer'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { useInvestorsByContry } from '../../hooks/useInvestorsByCountry'

export const RegionalMap = () => {
  const { data, isLoading } = useInvestorsByContry()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <ChartWrapper title='Regional Map'>
      <VSpacer size='small' />
      <Chart
        chartType='GeoChart'
        data={[['Country', 'Popularity'], ...data]}
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        mapsApiKey='YOUR_KEY_HERE'
      />
    </ChartWrapper>
  )
}
