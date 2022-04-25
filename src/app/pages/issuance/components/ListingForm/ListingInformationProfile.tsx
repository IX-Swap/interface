import React from 'react'
import { Grid } from '@mui/material'
import { DSOIntroduction } from 'app/components/DSO/components/DSOIntroduction'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export const ListingInformationProfile = () => {
  return (
    <Grid item>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <FormSectionHeader title='Information Profile' />
        </Grid>
        <Grid item>
          <DSOIntroduction />
        </Grid>
      </Grid>
    </Grid>
  )
}
