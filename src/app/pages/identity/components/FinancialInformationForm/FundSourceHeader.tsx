import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'

export const FundSourceHeader = () => {
  return (
    <>
      <Grid container alignItems='flex-end'>
        <Grid item xs={5}>
          <Typography variant='subtitle1'>Source of Funds</Typography>
        </Grid>
      </Grid>
      <Divider />
    </>
  )
}
