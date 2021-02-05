import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { AccessReports as AccessReportsTable } from 'app/pages/home/components/AccessReports'
import { UploadAccessReport } from 'app/pages/admin/components/UploadAccessReport'

export const AccessReports = () => {
  return (
    <Grid>
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
