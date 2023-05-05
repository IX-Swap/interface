import React from 'react'
import { Grid } from '@mui/material'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { TeamMemberView } from 'app/pages/issuance/components/ListingDetails/Information/TeamMemberView'
import { DsoTeamMember } from 'types/dso'

export interface TeamMembersProps {
  teamMembers: DsoTeamMember[]
}

export const TeamMembers = ({ teamMembers }: TeamMembersProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Team Members' />
          </Grid>
          {teamMembers !== undefined && teamMembers.length > 0
            ? teamMembers.map((member: any) => (
                <Grid item key={member._id}>
                  <TeamMemberView member={member} />
                </Grid>
              ))
            : null}
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
