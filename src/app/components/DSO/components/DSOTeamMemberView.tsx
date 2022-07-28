import React, { useState } from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { DSOTeamMemberPhoto } from 'app/components/DSO/components/DSOTeamMemberPhoto'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { DsoTeamMember } from 'types/dso'

export interface DSOTeamMemberViewProps {
  dsoId: string
  member: DsoTeamMember
}

export const DSOTeamMemberView = (props: DSOTeamMemberViewProps) => {
  const { member, dsoId } = props
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 2
      }}
      onClick={toggleExpanded}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
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
        </Grid>
        {expanded && (
          <Grid item xs={12}>
            <Box>{renderStringToHTML(member.about)}</Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
