import { Grid } from '@mui/material'
import { CapTablePageHeader } from 'app/pages/issuance/components/CapTable/CapTablePageHeader'
import { Investors } from 'app/pages/issuance/components/CapTable/Investors'
import { Insights } from 'app/pages/issuance/components/CapTable/Insights'
import { TopInsights } from 'app/pages/issuance/components/CapTable/TopInsights'
import React from 'react'

export const CapTable = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CapTablePageHeader />
      </Grid>
      <Grid item xs={12}>
        <Insights />
      </Grid>
      <Grid item xs={12}>
        <TopInsights />
      </Grid>
      <Grid item xs={12}>
        <Investors />
      </Grid>
    </Grid>
  )
}
