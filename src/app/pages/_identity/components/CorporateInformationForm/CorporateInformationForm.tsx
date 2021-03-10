import React from 'react'
import { Grid } from '@material-ui/core'
import { InformationFields } from 'app/pages/_identity/components/CorporateInformationForm/InformationFields'
import { CorporateAddressFields } from 'app/pages/_identity/components/CorporateInformationForm/CorporateAddressFields'
import { AuthorizedPersonnelFields } from 'app/pages/_identity/components/CorporateInformationForm/AuthorizedPersonnelFields'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'

export const CorporateInformationForm = () => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>
        <InformationFields />
      </Grid>
      <Grid item>
        <CorporateAddressFields />
      </Grid>
      <Grid item>
        <AuthorizedPersonnelFields />
      </Grid>
    </Grid>
  )
}
