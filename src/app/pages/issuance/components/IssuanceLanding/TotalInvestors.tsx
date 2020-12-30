import React from 'react'
import { Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { useTotalInvestors } from 'app/pages/issuance/hooks/useTotalInvestors'

export const TotalInvestors = () => {
  const { data, isLoading } = useTotalInvestors()

  if (isLoading) {
    return null
  }

  const total = data?.total ?? 0

  return (
    <ChartWrapper>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <ChartTitle title='Total Investors' small />
          <InsightValue value={total} />
        </Grid>
      </Grid>
    </ChartWrapper>
  )
}
