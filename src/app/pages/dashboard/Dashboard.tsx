import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const Dashboard = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={'Dashboard'} />
      </Grid>
      <RootContainer>
        <Grid container direction='column' spacing={6}>
          <Grid item></Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
