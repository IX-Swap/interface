import React from 'react'
import { Grid } from '@mui/material'
import { Stats } from './Stats'
import { useTotalStats } from 'app/pages/issuance/hooks/useTotalStats'
import { formatDecimal } from 'helpers/numbers'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const TotalStats = () => {
  const { data, isLoading } = useTotalStats()
  const totalInvestment: string = formatDecimal(data?.investment?.total ?? 0)
  const totalInvestmentIncrease: string = formatDecimal(
    data?.investment?.totalUp ?? 0
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (typeof data === 'undefined') {
    return null
  }

  return (
    <Grid item container gap={2}>
      <Grid item xs={12} md>
        <Stats
          title={'Total Commitments'}
          description='Keep track of the total amount you have invested or committed.'
          stats={`$${totalInvestment}`}
          increase={`$${totalInvestmentIncrease}`}
        />
      </Grid>
      <Grid item xs={12} md>
        <Stats
          title={'Total STOs'}
          description='Be informed of the running tally of available STOs for you to invest in.'
          stats={formatDecimal(data?.issuance?.total)}
          increase={formatDecimal(data?.issuance?.totalUp)}
        />
      </Grid>
    </Grid>
  )
}
