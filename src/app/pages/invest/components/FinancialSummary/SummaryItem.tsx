import { Grid, Typography } from '@mui/material'
import React from 'react'

export interface SummaryItemProps {
  label: string
  value: React.ReactNode
}

export const SummaryItem = ({ label, value }: SummaryItemProps) => {
  return (
    <Grid container direction='column' spacing={0}>
      <Grid item>
        <Typography sx={{ color: '#778194' }} variant='body1' noWrap>
          {label}
        </Typography>
      </Grid>
      <Grid item>{value}</Grid>
    </Grid>
  )
}
