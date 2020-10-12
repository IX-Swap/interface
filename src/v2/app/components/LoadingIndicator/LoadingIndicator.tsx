import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

export const LoadingIndicator = () => {
  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white'
      }}
    >
      <CircularProgress size={40} />
    </Grid>
  )
}
