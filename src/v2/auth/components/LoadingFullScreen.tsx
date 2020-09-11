import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'

export const LoadingFullScreen: React.FC = () => (
  <Grid
    container
    justify='center'
    alignItems='center'
    style={{ height: '100vh', width: '100vw' }}
  >
    <CircularProgress data-testid='progress' />
  </Grid>
)
