import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { AdminIdentityList } from 'app/pages/admin/components/AdminIdentityList/AdminIdentityList'
import { IdentityStatsCards } from 'app/pages/admin/components/IdentityStatsCards/IdentityStatsCards'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const Identities = () => {
  return (
    <Grid container direction='column' spacing={6} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Identities' />
      </Grid>
      <RootContainer>
        <Grid container direction='column' spacing={6}>
          <Grid item>
            <IdentityStatsCards />
          </Grid>
          <Grid item>
            <AdminIdentityList />
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
