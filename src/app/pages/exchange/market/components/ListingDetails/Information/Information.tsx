import { Grid } from '@material-ui/core'
import { Documents } from 'app/pages/exchange/market/components/ListingDetails/Information/Documents'
import { Profile } from 'app/pages/exchange/market/components/ListingDetails/Information/Profile'
import { TeamMembers } from 'app/pages/exchange/market/components/ListingDetails/Information/TeamMembers'
import React from 'react'

export const Information = () => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>
        <Profile />
      </Grid>
      <Grid item>
        <Documents data={[]} title='Documents' />
      </Grid>
      <Grid item>
        <TeamMembers listing={{}} />
      </Grid>
    </Grid>
  )
}
