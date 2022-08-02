import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOTeamMemberView } from 'app/components/DSO/components/DSOTeamMemberView'

export interface DSOTeamViewProps {
  dso: DigitalSecurityOffering
  isNewThemeOn?: boolean
}

export const DSOTeamView = ({ dso }: DSOTeamViewProps) => {
  const team = dso.team

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h5'>Team Members</Typography>
      </Grid>
      {team.length > 0
        ? team.map(member => (
            <Grid item xs={12} key={member._id}>
              <DSOTeamMemberView dsoId={dso._id} member={member} />
            </Grid>
          ))
        : null}
    </Grid>
  )
}
