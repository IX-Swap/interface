import { Grid } from '@material-ui/core'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { TopInvestors } from 'app/pages/issuance/components/IssuanceLanding/TopInvestors'
import React from 'react'

export const TopInsights = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <InsightCard>
          <TopInvestors position='right' title='Top Five Investors' />
        </InsightCard>
      </Grid>
    </Grid>
  )
}
