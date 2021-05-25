import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Avatar } from 'components/Avatar'

export const ListingHeader = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Avatar documentId={''} ownerId={''} variant='square' size={128} />
      </Grid>
      <Grid item>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <Typography variant='h2'>
              InvestaX Preferred Stock (IXPS)
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>InvestaX Digital Securities</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>Currency: USD</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
