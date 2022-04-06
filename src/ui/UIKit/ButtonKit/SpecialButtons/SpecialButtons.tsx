import { Grid, Typography } from '@mui/material'
import React from 'react'
import { ButtonsSamples } from 'ui/UIKit/ButtonKit/SpecialButtons/ButtonSamples'

export const SpecialButtons = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Special Buttons</Typography>
      </Grid>
      <Grid item xs={6}>
        <ButtonsSamples color='special-red' />
      </Grid>
      <Grid item xs={6}>
        <ButtonsSamples color='special-red' variant='outlined' />
      </Grid>
      <Grid item xs={6}>
        <ButtonsSamples color='special-green' />
      </Grid>
      <Grid item xs={6}>
        <ButtonsSamples color='special-green' variant='outlined' />
      </Grid>
    </Grid>
  )
}
