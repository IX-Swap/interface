import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { UploadReportButton } from 'app/pages/issuance/components/UploadReportButton'
import { FinancialReportsTable } from 'app/pages/issuance/components/FinancialReportsTable/FinancialReportsTable'

export const FinancialReports = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='Financial Reports' showBreadcrumbs />
      </Grid>
      <Grid item xs={12} container justifyContent='flex-end'>
        <Grid item>
          <UploadReportButton />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FinancialReportsTable />
      </Grid>
    </Grid>
  )
}
