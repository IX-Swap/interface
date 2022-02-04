import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { ReportDetails } from 'app/pages/issuance/components/ReportDetails/ReportDetails'
import { ReportDocuments } from 'app/pages/issuance/components/ReportDocuments'
import React from 'react'

export const ViewReport = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title='Financial Reports' showBreadcrumbs />
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          <FormSectionHeader title='Hamilton Token' />
        </Grid>
        <Grid item xs={12} md={5}>
          <ReportDetails />
        </Grid>
        <Grid item xs={12} md={7}>
          <ReportDocuments />
        </Grid>
      </Grid>
    </Grid>
  )
}
