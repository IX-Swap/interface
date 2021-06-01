import { Grid } from '@material-ui/core'
import { Documents } from 'app/pages/exchange/components/ListingDetails/Information/Documents'
import { Profile } from 'app/pages/exchange/components/ListingDetails/Information/Profile'
import { TeamMembers } from 'app/pages/exchange/components/ListingDetails/Information/TeamMembers'
import React from 'react'
import { ListingView } from 'types/listing'

export interface InformationProps {
  data: ListingView
}

export const Information = ({ data }: InformationProps) => {
  return (
    <Grid container spacing={6} direction='column'>
      <Profile profile={data.introduction} />
      <Grid item>
        <Documents data={data.documents} title='Documents' />
      </Grid>
      <Grid item>
        <TeamMembers listingId={data._id} teamMembers={data.team} />
      </Grid>
    </Grid>
  )
}
