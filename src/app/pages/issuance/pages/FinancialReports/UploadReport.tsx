import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { UploadReportForm } from 'app/pages/issuance/components/UploadReportForm/UploadReportForm'
import { RootContainer } from 'ui/RootContainer'

export const UploadReport = () => {
  return (
    <Grid container spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Financial Reports' showBreadcrumbs />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <UploadReportForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
