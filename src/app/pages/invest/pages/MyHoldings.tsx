import { Grid, Typography } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'

export const MyHoldings = () => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <PageHeader title='My Holdings' showBreadcrumbs />
      </Grid>
      <Grid item>
        <Typography variant='h3'>Your Holdings</Typography>
        <Typography variant='body1'>
          View, manage and track the value of your private company shares and
          stock options over time. Receive insights, and investment and
          liquidity opportunities specific to your holdings.
        </Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  )
}
