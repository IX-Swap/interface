import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { AccountActions } from './AccountActions/AccountActions'
import { TotalStats } from './TotalStats/TotalStats'

export const Dashboard = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={'Dashboard'} />
      </Grid>
      <RootContainer>
        <Grid container direction='column' spacing={6}>
          <Grid item>
            <AccountActions />
          </Grid>
        </Grid>

        <TotalStats />
      </RootContainer>
    </Grid>
  )
}
