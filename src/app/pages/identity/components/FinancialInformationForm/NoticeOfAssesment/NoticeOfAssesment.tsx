import { Grid, Typography } from '@mui/material'
import { Breakdown } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/Breakdown'
import React from 'react'

export const NoticeOfAssesment = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>
          Notice of Assessment{' '}
          <Typography
            component='span'
            variant='subtitle1'
            color='textSecondary'
          >
            (Basic, Last 2 Years)
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Breakdown />
      </Grid>
    </Grid>
  )
}
