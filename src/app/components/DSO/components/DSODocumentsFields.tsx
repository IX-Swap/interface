import React from 'react'
import { Grid } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { DSODataroom } from 'app/components/DSO/components/DSODataroom'
import { DSOVideoLinks } from 'app/components/DSO/components/DSOVideoLinks'
import { DSOFAQs } from 'app/components/DSO/components/DSOFAQs'

export const DSODocumentsFields = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FieldContainer>
          <DSODataroom />
        </FieldContainer>
      </Grid>
      <Grid item xs={12}>
        <FieldContainer>
          <DSOVideoLinks />
        </FieldContainer>
      </Grid>
      <Grid item xs={12}>
        <FieldContainer>
          <DSOFAQs />
        </FieldContainer>
      </Grid>
    </Grid>
  )
}
