import { Grid, Typography } from '@material-ui/core'
import React from 'react'

export const DialogText: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='subtitle2' align='center'>
          Would you like to have it?
        </Typography>
      </Grid>
    </Grid>
  )
}
