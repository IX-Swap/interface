import React from 'react'
import { Grid, Typography } from '@material-ui/core'

export interface DSODataDisplayProps {
  label: string
  value?: string | number
}

export const DSODataDisplay = ({ label, value }: DSODataDisplayProps) => {
  return (
    <Grid container direction='column'>
      <Typography variant='subtitle1'>{label}</Typography>
      <Typography variant='body1'>{value}</Typography>
    </Grid>
  )
}
