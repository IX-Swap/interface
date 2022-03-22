import React from 'react'
import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { TeamMemberView } from 'app/pages/exchange/components/ListingDetails/Information/TeamMemberView'
import { DsoTeamMember } from 'types/dso'
import { VSpacer } from 'components/VSpacer'

export interface TeamMembersProps {
  teamMembers: DsoTeamMember[]
  listingId: string
}

export const TeamMembers = ({ teamMembers, listingId }: TeamMembersProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormSectionHeader title='Team Members' />
      </Grid>
      <Grid item>
        <Grid container spacing={3} direction='column'>
          {teamMembers !== undefined && teamMembers.length > 0
            ? teamMembers.map((member: any) => (
                <Grid item key={member._id}>
                  <TeamMemberView member={member} />
                  <VSpacer size='medium' />
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Grid>
  )
}
