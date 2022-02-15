import { Grid } from '@material-ui/core'
import { LaunchDate } from 'app/pages/issuance/components/UploadReportForm/LaunchDate'
import { NetAssetValueInput } from 'app/pages/issuance/components/UploadReportForm/NetAssetValueInput'
import { ReportDateInput } from 'app/pages/issuance/components/UploadReportForm/ReportDateInput'
import React from 'react'

export const ReportDetails = () => {
  return (
    <Grid container spacing={3} alignItems='center'>
      <Grid item xs={12} md={4}>
        <NetAssetValueInput />
      </Grid>
      <Grid item xs={12} md={5}>
        <ReportDateInput />
      </Grid>
      <Grid item xs={12} md={3}>
        <LaunchDate />
      </Grid>
    </Grid>
  )
}
