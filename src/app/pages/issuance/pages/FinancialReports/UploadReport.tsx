import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { UploadReportForm } from 'app/pages/issuance/components/UploadReportForm/UploadReportForm'

export const UploadReport = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='Financial Reports' showBreadcrumbs />
      </Grid>
      <Grid item xs={12}>
        <UploadReportForm />
      </Grid>
    </Grid>
  )
}
