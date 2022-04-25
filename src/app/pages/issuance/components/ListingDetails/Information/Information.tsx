import { Grid } from '@mui/material'
import { Documents } from 'app/pages/issuance/components/ListingDetails/Information/Documents'
import { Profile } from 'app/pages/issuance/components/ListingDetails/Information/Profile'
import { TeamMembers } from 'app/pages/issuance/components/ListingDetails/Information/TeamMembers'
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
