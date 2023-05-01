import React from 'react'
import { Grid } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { DSOInformationProfile } from 'app/components/DSO/components/DSOInformationProfile'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'

export const DSOCompanyInformationFields = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FieldContainer>
          <DSOInformationProfile />
        </FieldContainer>
      </Grid>
      <Grid item xs={12}>
        <FieldContainer>
          <DSOTeam />
        </FieldContainer>
      </Grid>
    </Grid>
  )
}
