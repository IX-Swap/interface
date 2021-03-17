import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useStlyes } from 'auth/components/LoadingFullScreen.styles'

export const LoadingFullScreen: React.FC = () => {
  const { container } = useStlyes()

  return (
    <Grid container justify='center' alignItems='center' className={container}>
      <CircularProgress data-testid='progress' />
    </Grid>
  )
}
