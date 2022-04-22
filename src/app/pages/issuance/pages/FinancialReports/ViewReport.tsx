import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { ReportDetails } from 'app/pages/issuance/components/ReportDetails/ReportDetails'
import React from 'react'

export const ViewReport = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title='Financial Reports' showBreadcrumbs />
      </Grid>
      <Grid item xs={12}>
        <ReportDetails />
      </Grid>
    </Grid>
  )
}
