import React, { ReactElement } from 'react'
import { Grid } from '@material-ui/core'

export interface LayoutWrapperProps {
  children: ReactElement
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => (
  <Grid item container spacing={1}>
    <Grid item xs={3} />
    <Grid item xs={6}>
      {children}
    </Grid>
  </Grid>
)
