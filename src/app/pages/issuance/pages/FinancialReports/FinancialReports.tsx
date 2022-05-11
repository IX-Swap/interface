import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { UploadReportButton } from 'app/pages/issuance/components/UploadReportButton'
import { FinancialReportsTable } from 'app/pages/issuance/components/FinancialReportsTable/FinancialReportsTable'
import { RootContainer } from 'ui/RootContainer'

export const FinancialReports = () => {
  return (
    <Grid container spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Financial Reports' showBreadcrumbs />
      </Grid>
      <RootContainer>
        <Grid
          item
          xs={12}
          container
          justifyContent='flex-end'
          style={{ marginBottom: 20 }}
        >
          <Grid item>
            <UploadReportButton />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FinancialReportsTable />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
