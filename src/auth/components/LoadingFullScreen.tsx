import React from 'react'
import { Grid, CircularProgress } from '@mui/material'
import { useStyles } from 'auth/components/LoadingFullScreen.styles'

export const LoadingFullScreen: React.FC = () => {
  const { container } = useStyles()

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      className={container}
    >
      <CircularProgress data-testid='progress' />
    </Grid>
  )
}
