import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { AdminIdentityList } from 'app/pages/admin/components/AdminIdentityList/AdminIdentityList'
import { IdentityStatsCards } from 'app/pages/admin/components/IdentityStatsCards/IdentityStatsCards'
import React from 'react'

export const Identities = () => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item xs={12}>
        <PageHeader title='Identities' />
      </Grid>
      <Grid item>
        <IdentityStatsCards />
      </Grid>
      <Grid item>
        <AdminIdentityList />
      </Grid>
    </Grid>
  )
}
