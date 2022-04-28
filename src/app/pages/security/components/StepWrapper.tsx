import React, { ReactElement } from 'react'
import { Typography, Grid } from '@mui/material'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface StepWrapperProps {
  title: string | ReactElement
  children: React.ReactNode
}

export const StepWrapper = ({ title, children }: StepWrapperProps) => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid container direction='column'>
      <Grid item xs={12}>
        <Typography align='center' variant={isMobile ? 'h4' : 'h2'}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  )
}
