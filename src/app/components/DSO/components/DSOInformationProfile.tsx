import React from 'react'
import { Grid } from '@mui/material'
import { DSOIntroduction } from 'app/components/DSO/components/DSOIntroduction'
import { DSOBusinessModel } from 'app/components/DSO/components/DSOBusinessModel'
import { DSOUseOfProceeds } from 'app/components/DSO/components/DSOUseOfProceeds'
import { DSOFundRaisingMilestone } from 'app/components/DSO/components/DSOFundRaisingMilestone'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export const DSOInformationProfile = () => {
  return (
    <Grid item>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <FormSectionHeader title='Information Profile' />
        </Grid>
        <Grid item>
          <DSOIntroduction />
        </Grid>
        <Grid item>
          <DSOBusinessModel />
        </Grid>
        <Grid item>
          <DSOUseOfProceeds />
        </Grid>
        <Grid item>
          <DSOFundRaisingMilestone />
        </Grid>
      </Grid>
    </Grid>
  )
}
