import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { DSOTeamMemberPhoto } from 'app/components/DSO/components/DSOTeamMemberPhoto'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { DsoTeamMember } from 'types/dso'
import { Expandable } from 'app/components/Expandable/Expandable'

export interface DSOTeamMemberViewProps {
  dsoId: string
  member: DsoTeamMember
}

export const DSOTeamMemberView = (props: DSOTeamMemberViewProps) => {
  const { member, dsoId } = props

  return (
    <Expandable
      mainComponent={
        <Grid container direction='row' alignItems='center' spacing={2}>
          <Grid item>
            <DSOTeamMemberPhoto
              dsoId={dsoId}
              photoId={member.photo}
              size={48}
            />
          </Grid>
          <Grid item>
            <Typography variant='h4'>{member.name}</Typography>
            <Typography>{member.position}</Typography>
          </Grid>
        </Grid>
      }
      expandedComponent={<Box>{renderStringToHTML(member.about)}</Box>}
    />
  )
}
