import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { ReactComponent as EmptyBox } from 'assets/icons/empty-box.svg'

export const NoData = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container justifyContent='center'>
        <Grid item>
          <EmptyBox />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography align='center' variant='body1'>
          There is no investment at the moment. Once you receive investments in
          your deal you will be able to see the charts.
        </Typography>
      </Grid>
    </Grid>
  )
}
