import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOTeamMemberView } from 'app/components/DSO/components/DSOTeamMemberView'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { VSpacer } from 'components/VSpacer'

export interface DSOTeamViewProps {
  dso: DigitalSecurityOffering
  isNewThemeOn?: boolean
}

export const DSOTeamView = ({
  dso,
  isNewThemeOn = false
}: DSOTeamViewProps) => {
  const team = dso.team

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        {isNewThemeOn ? (
          <>
            <Typography
              variant={'h4'}
              color={'primary'}
              style={{ fontWeight: 700 }}
            >
              Team Members
            </Typography>
            <VSpacer size={'small'} />
          </>
        ) : (
          <FormSectionHeader title='Team Members' />
        )}
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
