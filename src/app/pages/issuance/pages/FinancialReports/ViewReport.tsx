import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { ReportDetails } from 'app/pages/issuance/components/ReportDetails/ReportDetails'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const ViewReport = () => {
  return (
    <Grid container style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Financial Reports' showBreadcrumbs />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <ReportDetails />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
