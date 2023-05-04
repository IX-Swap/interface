import React from 'react'
import { Grid, Box } from '@mui/material'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { LabelledValue } from 'components/LabelledValue'
import { DsoTeamMember } from 'types/dso'
import { TeamMemberPhoto } from 'app/pages/issuance/components/ListingDetails/Information/TeamMemberPhoto'
import { Expandable } from 'app/components/Expandable/Expandable'

export interface TeamMemberViewProps {
  member: DsoTeamMember
}

export const TeamMemberView = (props: TeamMemberViewProps) => {
  const { member } = props

  return (
    <Expandable
      showArrow
      mainComponent={
        <Grid container direction='row' alignItems='center' spacing={2} p={1}>
          <Grid item>
            <TeamMemberPhoto photoId={member.photo} size={48} />
          </Grid>
          <Grid item>
            <LabelledValue
              label={member.name}
              value={member.position}
              isRedesigned
              gap={0.2}
            />
          </Grid>
        </Grid>
      }
      expandedComponent={<Box px={2}>{renderStringToHTML(member.about)}</Box>}
    />
  )
}
