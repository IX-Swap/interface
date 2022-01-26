import React from 'react'
import { Grid } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { LabelledValue } from 'components/LabelledValue'

export interface DSOInformationViewProps {
  dso: DigitalSecurityOffering
}

export const DSOInformationView = ({ dso }: DSOInformationViewProps) => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <FormSectionHeader title='Information Profile' />
      </Grid>

      <Grid item>
        <LabelledValue
          label='Company Information'
          value={renderStringToHTML(dso.introduction)}
          align='justify'
        />
      </Grid>

      <Grid item>
        <LabelledValue
          label='Business Model'
          value={renderStringToHTML(dso.businessModel)}
          align='justify'
        />
      </Grid>

      <Grid item>
        <LabelledValue
          label='Use of Proceeds'
          value={renderStringToHTML(dso.useOfProceeds)}
          align='justify'
        />
      </Grid>

      <Grid item>
        <LabelledValue
          label='Fundraising Milestones'
          value={renderStringToHTML(dso.fundraisingMilestone)}
          align='justify'
        />
      </Grid>
    </Grid>
  )
}
