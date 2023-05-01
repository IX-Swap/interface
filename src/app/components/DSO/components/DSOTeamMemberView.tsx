import React from 'react'
import { Box, Grid } from '@mui/material'
import { DSOTeamMemberPhoto } from 'app/components/DSO/components/DSOTeamMemberPhoto'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { DsoTeamMember } from 'types/dso'
import { Expandable } from 'app/components/Expandable/Expandable'
import { LabelledValue } from 'components/LabelledValue'

export interface DSOTeamMemberViewProps {
  dsoId: string
  member: DsoTeamMember
}

export const DSOTeamMemberView = (props: DSOTeamMemberViewProps) => {
  const { member, dsoId } = props

  return (
    <Expandable
      showArrow
      mainComponent={
        <Grid container direction='row' alignItems='center' spacing={2} p={1}>
          <Grid item>
            <DSOTeamMemberPhoto
              dsoId={dsoId}
              photoId={member.photo}
              size={48}
            />
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
