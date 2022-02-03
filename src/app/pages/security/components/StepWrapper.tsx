import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'

export interface StepWrapperProps {
  title: string
  children: React.ReactNode
}

export const StepWrapper = ({ title, children }: StepWrapperProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item xs={12}>
        <Typography align='center' variant='h5'>
          {title}
        </Typography>
        <VSpacer size='small' />
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  )
}
