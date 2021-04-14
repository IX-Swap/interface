import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { IdentityStatsCards } from 'app/pages/admin/components/IdentityStatsCards/IdentityStatsCards'
import React from 'react'

export const Identities = () => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='Identities' />
      </Grid>
      <Grid item>
        <IdentityStatsCards />
      </Grid>
    </Grid>
  )
}
