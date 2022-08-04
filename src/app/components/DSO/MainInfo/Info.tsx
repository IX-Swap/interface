import { Grid, Typography } from '@mui/material'
import React from 'react'

export interface InfoProps {
  label: string
  value?: string | number
}
export const Info = ({ label, value }: InfoProps) => {
  return (
    <Grid container spacing={0} justifyContent='space-between'>
      <Grid itemScope>
        <Typography variant='subtitle1' color='textSecondary'>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1' textAlign='right'>
          {value !== undefined ? value : '-'}
        </Typography>
      </Grid>
    </Grid>
  )
}
