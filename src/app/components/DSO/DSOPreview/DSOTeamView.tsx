import React from 'react'
import { Grid } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOTeamMemberView } from 'app/components/DSO/components/DSOTeamMemberView'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export interface DSOTeamViewProps {
  dso: DigitalSecurityOffering
  isNewThemeOn?: boolean
}

export const DSOTeamView = ({ dso }: DSOTeamViewProps) => {
  const team = dso.team

  return (
    <Grid container direction='column' spacing={3}>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Team Members' />
          </Grid>
          {team.length > 0
            ? team.map(member => (
                <Grid item xs={12} key={member._id}>
                  <DSOTeamMemberView dsoId={dso._id} member={member} />
                </Grid>
              ))
            : null}
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
