import { Grid, Typography } from '@mui/material'
import React from 'react'

export interface DetailsItemProps {
  label: string
  value: string
}

export const DetailsItem = ({ label, value }: DetailsItemProps) => {
  return (
    <Grid container justifyContent='space-between'>
      <Grid item>
        <Typography style={{ fontWeight: 500 }}>{label}</Typography>
      </Grid>
      <Grid item>
        <Typography align='right' style={{ fontWeight: 400 }}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  )
}