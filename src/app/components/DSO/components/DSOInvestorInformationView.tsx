import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOInvestorInformationViewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorInformationView = (
  props: DSOInvestorInformationViewProps
) => {
  const { dso } = props

  return (
    <Grid container direction='column' spacing={5}>
      <Grid item>
        <FormSectionHeader title='Company Profile' />
        {renderStringToHTML(dso.introduction)}
      </Grid>

      <Grid item>
        <Typography variant='h3'>Business Model</Typography>
        {renderStringToHTML(dso.businessModel)}
      </Grid>

      <Grid item>
        <Typography variant='h3'>Use of Proceeds</Typography>
        {renderStringToHTML(dso.useOfProceeds)}
      </Grid>

      <Grid item>
        <Typography variant='h3'>Fundraising Milestone</Typography>
        {renderStringToHTML(dso.fundraisingMilestone)}
      </Grid>

      <Grid item>
        <DSOTeamView dso={dso} />
      </Grid>
    </Grid>
  )
}
