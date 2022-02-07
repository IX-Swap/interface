import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'

export const FundSourceHeader = () => {
  return (
    <>
      <Grid container alignItems='flex-end'>
        <Grid item xs={5}>
          <Typography variant='subtitle1'>Source of Funds</Typography>
          <Typography variant='subtitle2'>Select all that apply</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant='subtitle1'>
            How much of this source will be used to fund your account?
          </Typography>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Divider />
      <VSpacer size='small' />
    </>
  )
}
