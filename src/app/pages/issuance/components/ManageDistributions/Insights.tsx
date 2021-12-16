import { Grid } from '@material-ui/core'
import { AvailableBalance } from 'app/pages/issuance/components/ManageDistributions/AvailableBalance'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { TotalTokens } from 'app/pages/issuance/components/CapTable/TotalTokens'
import { NextDistributionTimer } from 'app/pages/issuance/components/ManageDistributions/NextDistributionTimer'
import React from 'react'

export const Insights = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <InsightCard>
          <AvailableBalance />
        </InsightCard>
      </Grid>
      <Grid item xs={12} md={3}>
        <InsightCard>
          <TotalTokens />
        </InsightCard>
      </Grid>
      <Grid item xs={12} md={3}></Grid>
      <Grid item xs={12} md={3}>
        <NextDistributionTimer isNewThemeOn my={0} />
      </Grid>
    </Grid>
  )
}
