import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { DetailsOfIssuanceForm } from 'app/pages/_identity/components/DetailsOfIssuanceForm/DetailsOfIssuanceForm'
import React from 'react'

export const CreateDetailsOfIssuance = () => {
  return (
    <Grid container>
      <Grid container item xs={12}>
        <PageHeader title='Create Details of Issuance' />
      </Grid>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <DetailsOfIssuanceForm />
      </Grid>
    </Grid>
  )
}
