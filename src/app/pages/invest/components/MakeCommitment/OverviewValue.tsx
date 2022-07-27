import { Grid, Typography } from '@mui/material'
import React from 'react'

export interface OverviewValueProps {
  label: string
  value: string
}

export const OverviewValue = ({ label, value }: OverviewValueProps) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant='subtitle1' color='text.secondary'>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>{value}</Typography>
      </Grid>
    </Grid>
  )
}
