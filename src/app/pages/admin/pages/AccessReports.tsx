import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { AccessReports as AccessReportsTable } from 'app/pages/educationCentre/components/AccessReports'
import { UploadAccessReport } from 'app/pages/admin/components/UploadAccessReport'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const AccessReports = () => {
  return (
    <Grid container direction='column'>
      <Grid item xs={12}>
        <PageHeader title='Access Reports' />
      </Grid>
      <Grid item xs={12} container justify='flex-end'>
        <Box>
          <UploadAccessReport />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <AccessReportsTable editable />
      </Grid>
    </Grid>
  )
}
