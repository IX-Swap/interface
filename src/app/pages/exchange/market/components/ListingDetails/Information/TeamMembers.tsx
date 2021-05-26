import React from 'react'
import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { TeamMemberView } from 'app/pages/exchange/market/components/ListingDetails/Information/TeamMemberView'

export interface TeamMembersProps {
  listing: any
}

export const TeamMembers = ({ listing }: TeamMembersProps) => {
  const team = listing.team

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormSectionHeader title='Team Members' />
      </Grid>

      <Grid item>
        <Grid container spacing={3} direction='column'>
          {team !== undefined && team.length > 0
            ? team.map((member: any) => (
                <Grid item key={member._id}>
                  <TeamMemberView
                    resourceId={listing._id}
                    resourceUri='/listing/data/uri'
                    member={member}
                  />
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Grid>
  )
}
