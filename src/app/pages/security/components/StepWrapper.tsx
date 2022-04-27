import React, { ReactElement } from 'react'
import { Typography, Grid } from '@mui/material'

export interface StepWrapperProps {
  title: string | ReactElement
  children: React.ReactNode
}

export const StepWrapper = ({ title, children }: StepWrapperProps) => {
  return (
    <Grid container direction='column'>
      <Grid item xs={12}>
        <Typography align='center' variant='h2'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  )
}
