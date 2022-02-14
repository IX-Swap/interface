import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
export const UploadReport = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title='Financial Reports' showBreadcrumbs />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  )
}
