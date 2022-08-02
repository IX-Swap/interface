import React from 'react'
import { Grid } from '@mui/material'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { DigitalSecurityOffering } from 'types/dso'
import { TextContent } from 'app/components/DSO/components/TextContent/TextContent'

export interface DSOInvestorInformationViewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorInformationView = (
  props: DSOInvestorInformationViewProps
) => {
  const { dso } = props

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextContent
          content={renderStringToHTML(dso.introduction)}
          title='Company Profile'
        />
      </Grid>
      <Grid item xs={12}>
        <TextContent
          content={renderStringToHTML(dso.businessModel)}
          title='Business Model'
        />
      </Grid>
      <Grid item xs={12}>
        <TextContent
          content={renderStringToHTML(dso.useOfProceeds)}
          title='Use of Proceeds'
        />
      </Grid>
      <Grid item xs={12}>
        <TextContent
          content={renderStringToHTML(dso.fundraisingMilestone)}
          title='Fundraising Milestone'
        />
      </Grid>

      <Grid item xs={12}>
        <DSOTeamView dso={dso} isNewThemeOn />
      </Grid>
    </Grid>
  )
}
