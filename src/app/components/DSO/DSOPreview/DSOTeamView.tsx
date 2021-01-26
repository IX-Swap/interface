import React from 'react'
import { Grid } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOInformationViewProps } from 'app/components/DSO/DSOPreview/DSOInformationView'
import { DSOTeamMemberView } from 'app/components/DSO/components/DSOTeamMemberView'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface DSOTeamViewProps {
  dso: DigitalSecurityOffering
}

export const DSOTeamView = ({ dso }: DSOInformationViewProps) => {
  const team = dso.team

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormSectionHeader title='Team Members' />
      </Grid>

      <Grid item>
        <Grid container spacing={3} direction='column'>
          {team.length > 0
            ? team.map(member => (
                <Grid item key={member._id}>
                  <DSOTeamMemberView dsoId={dso._id} member={member} />
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Grid>
  )
}
