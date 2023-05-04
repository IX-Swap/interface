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
    <Grid container spacing={5} direction='column'>
      <Grid item xs={12}>
        <Profile profile={data?.introduction} />
      </Grid>
      <Grid item xs={12}>
        <Documents data={data?.documents} title='Documents' />
      </Grid>
      <Grid item xs={12}>
        <TeamMembers teamMembers={data?.team} />
      </Grid>
    </Grid>
  )
}
